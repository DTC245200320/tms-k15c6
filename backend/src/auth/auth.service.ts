import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'
import { createHash, randomUUID } from 'node:crypto'
import { DatabaseService } from '../database/database.service'
import type { Role } from './auth.contract'

type AccountRow = { id: string; email: string; name: string; passwordHash: string; roles: Role[] }

@Injectable()
export class AuthService {
  constructor(private readonly jwt: JwtService, private readonly db: DatabaseService) {}

  private hashToken(token: string) { return createHash('sha256').update(token).digest('hex') }

  private async findAccount(email: string): Promise<AccountRow | null> {
    const result = await this.db.query<AccountRow>(`SELECT u.id,u.email,u.full_name AS name,u.password_hash AS "passwordHash",coalesce(array_agg(ur.role_code) FILTER (WHERE ur.role_code IS NOT NULL),'{}') AS roles FROM users u LEFT JOIN user_roles ur ON ur.user_id=u.id WHERE u.email=$1 AND u.status='ACTIVE' AND (u.locked_until IS NULL OR u.locked_until < now()) GROUP BY u.id`, [email.trim().toLowerCase()])
    return result.rows[0] ?? null
  }

  private async issueTokens(account: AccountRow) {
    const sessionId = randomUUID()
    const accessToken = await this.jwt.signAsync({ sub: account.id, email: account.email, roles: account.roles, type: 'access' }, { secret: process.env.JWT_ACCESS_SECRET ?? 'tms-dev-access-change-me', expiresIn: '15m' })
    const refreshToken = await this.jwt.signAsync({ sub: account.id, sessionId, type: 'refresh' }, { secret: process.env.JWT_REFRESH_SECRET ?? process.env.JWT_ACCESS_SECRET ?? 'tms-dev-refresh-change-me', expiresIn: '7d' })
    await this.db.query(`INSERT INTO refresh_sessions(id,user_id,token_hash,expires_at) VALUES($1,$2,$3,now()+interval '7 days')`, [sessionId, account.id, this.hashToken(refreshToken)])
    return { accessToken, refreshToken, expiresIn: 900, user: { id: account.id, email: account.email, name: account.name, roles: account.roles } }
  }

  async login(email: string, password: string) {
    const account = await this.findAccount(email)
    if (!account || !(await argon2.verify(account.passwordHash, password))) {
      if (account) await this.db.query(`UPDATE users SET failed_login_count=failed_login_count+1, locked_until=CASE WHEN failed_login_count+1 >= 5 THEN now()+interval '15 minutes' ELSE locked_until END WHERE id=$1`, [account.id])
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng')
    }
    await this.db.query(`UPDATE users SET failed_login_count=0,locked_until=NULL WHERE id=$1`, [account.id])
    return this.issueTokens(account)
  }

  async refresh(refreshToken: string) {
    let claims: { sub: string; sessionId: string; type: string }
    try { claims = await this.jwt.verifyAsync(refreshToken, { secret: process.env.JWT_REFRESH_SECRET ?? process.env.JWT_ACCESS_SECRET }) } catch { throw new UnauthorizedException('Refresh token đã hết hạn hoặc không hợp lệ') }
    const session = await this.db.query<{ userId: string }>(`SELECT user_id AS "userId" FROM refresh_sessions WHERE id=$1 AND token_hash=$2 AND revoked_at IS NULL AND expires_at>now()`, [claims.sessionId, this.hashToken(refreshToken)])
    if (!session.rows[0]) throw new UnauthorizedException('Refresh token đã bị thu hồi')
    await this.db.query(`UPDATE refresh_sessions SET revoked_at=now() WHERE id=$1`, [claims.sessionId])
    const account = await this.db.query<AccountRow>(`SELECT u.id,u.email,u.full_name AS name,u.password_hash AS "passwordHash",coalesce(array_agg(ur.role_code) FILTER (WHERE ur.role_code IS NOT NULL),'{}') AS roles FROM users u LEFT JOIN user_roles ur ON ur.user_id=u.id WHERE u.id=$1 GROUP BY u.id`, [session.rows[0].userId])
    if (!account.rows[0]) throw new UnauthorizedException('Tài khoản không tồn tại')
    return this.issueTokens(account.rows[0])
  }

  async logout(refreshToken: string) { await this.db.query(`UPDATE refresh_sessions SET revoked_at=now() WHERE token_hash=$1 AND revoked_at IS NULL`, [this.hashToken(refreshToken)]); return { success: true } }

  async changePassword(email: string, currentPassword: string, newPassword: string) {
    const account = await this.findAccount(email)
    if (!account || !(await argon2.verify(account.passwordHash, currentPassword))) throw new UnauthorizedException('Mật khẩu hiện tại không đúng')
    if (!/(?=.*[A-Za-z])(?=.*\d).{8,}/.test(newPassword)) throw new UnauthorizedException('Mật khẩu mới phải có ít nhất 8 ký tự, gồm chữ và số')
    await this.db.query(`UPDATE users SET password_hash=$2,updated_at=now() WHERE id=$1`, [account.id, await argon2.hash(newPassword)])
    await this.db.query(`UPDATE refresh_sessions SET revoked_at=now() WHERE user_id=$1 AND revoked_at IS NULL`, [account.id])
    return { success: true, message: 'Đổi mật khẩu thành công; các phiên khác đã bị đăng xuất' }
  }
}
