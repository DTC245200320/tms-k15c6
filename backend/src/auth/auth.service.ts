import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'
import type { Role } from './auth.contract'

type Account = { id: string; email: string; name: string; roles: Role[]; passwordHash: string; lockedUntil?: number }

@Injectable()
export class AuthService {
  private readonly accounts = new Map<string, Account>()
  private readonly refreshSessions = new Map<string, string>()

  constructor(private readonly jwt: JwtService) {
    void this.addDemo('admin@tms.edu.vn', 'Admin TMS', ['ADMIN'], 'Admin@123')
    void this.addDemo('manager@tms.edu.vn', 'Linh Trần', ['TRAINING_MANAGER'], 'Manager@123')
    void this.addDemo('instructor@tms.edu.vn', 'Nguyễn Hoàng Long', ['INSTRUCTOR'], 'Instructor@123')
    void this.addDemo('student@tms.edu.vn', 'Nguyễn Minh Anh', ['STUDENT'], 'Student@123')
  }

  private async addDemo(email: string, name: string, roles: Role[], password: string) {
    this.accounts.set(email, { id: email, email, name, roles, passwordHash: await argon2.hash(password) })
  }

  async login(email: string, password: string) {
    const account = this.accounts.get(email.trim().toLowerCase())
    if (!account || (account.lockedUntil && account.lockedUntil > Date.now()) || !(await argon2.verify(account.passwordHash, password))) throw new UnauthorizedException('Email hoặc mật khẩu không đúng')
    const accessToken = await this.jwt.signAsync({ sub: account.id, email: account.email, roles: account.roles, type: 'access' }, { expiresIn: '15m' })
    const refreshToken = await this.jwt.signAsync({ sub: account.id, type: 'refresh' }, { expiresIn: '7d' })
    this.refreshSessions.set(refreshToken, account.id)
    return { accessToken, refreshToken, expiresIn: 900, user: { id: account.id, email: account.email, name: account.name, roles: account.roles } }
  }

  async refresh(refreshToken: string) {
    const userId = this.refreshSessions.get(refreshToken)
    if (!userId) throw new UnauthorizedException('Refresh token không hợp lệ hoặc đã bị thu hồi')
    try { await this.jwt.verifyAsync(refreshToken) } catch { this.refreshSessions.delete(refreshToken); throw new UnauthorizedException('Refresh token đã hết hạn') }
    this.refreshSessions.delete(refreshToken)
    const account = [...this.accounts.values()].find((item) => item.id === userId)
    if (!account) throw new UnauthorizedException('Tài khoản không tồn tại')
    // Issue a rotated pair directly without requiring the user's password again.
    const accessToken = await this.jwt.signAsync({ sub: account.id, email: account.email, roles: account.roles, type: 'access' }, { expiresIn: '15m' })
    const rotated = await this.jwt.signAsync({ sub: account.id, type: 'refresh' }, { expiresIn: '7d' })
    this.refreshSessions.set(rotated, account.id)
    return { accessToken, refreshToken: rotated, expiresIn: 900 }
  }

  async logout(refreshToken: string) { this.refreshSessions.delete(refreshToken); return { success: true } }

  async changePassword(email: string, currentPassword: string, newPassword: string) {
    const account = this.accounts.get(email.trim().toLowerCase())
    if (!account || !(await argon2.verify(account.passwordHash, currentPassword))) throw new UnauthorizedException('Mật khẩu hiện tại không đúng')
    if (!/(?=.*[A-Za-z])(?=.*\d).{8,}/.test(newPassword)) throw new UnauthorizedException('Mật khẩu mới phải có ít nhất 8 ký tự, gồm chữ và số')
    account.passwordHash = await argon2.hash(newPassword)
    return { success: true, message: 'Đổi mật khẩu thành công; các phiên khác cần đăng nhập lại' }
  }
}
