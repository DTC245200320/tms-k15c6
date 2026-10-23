import { Injectable } from '@nestjs/common'
import { createHash } from 'node:crypto'
import { DatabaseService } from '../../database/database.service'

@Injectable()
export class S102SessionLogoutService {
  constructor(private readonly db: DatabaseService) {}

  private hashToken(token: string) {
    return createHash('sha256').update(token).digest('hex')
  }

  async logout(refreshToken: string) {
    const result = await this.db.query(
      `UPDATE refresh_sessions
       SET revoked_at = now()
       WHERE token_hash = $1 AND revoked_at IS NULL
       RETURNING id`,
      [this.hashToken(refreshToken)],
    )

    return { success: true, revoked: result.rowCount === 1 }
  }
}
