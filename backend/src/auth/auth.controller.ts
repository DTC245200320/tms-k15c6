import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('/auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('/login')
  login(@Body() body: { email: string; password: string }) { return this.auth.login(body.email, body.password) }

  @Post('/refresh')
  refresh(@Body() body: { refreshToken: string }) { return this.auth.refresh(body.refreshToken) }

  @Post('/logout')
  logout(@Body() body: { refreshToken: string }) { return this.auth.logout(body.refreshToken) }

  @Post('/change-password')
  changePassword(@Body() body: { email: string; currentPassword: string; newPassword: string }) { return this.auth.changePassword(body.email, body.currentPassword, body.newPassword) }
}
