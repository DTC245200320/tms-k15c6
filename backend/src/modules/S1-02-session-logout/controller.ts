import { Body, Controller, Post } from '@nestjs/common'
import { S102SessionLogoutDto } from './dto'
import { S102SessionLogoutService } from './service'

@Controller('/auth')
export class S102SessionLogoutController {
  constructor(private readonly service: S102SessionLogoutService) {}

  @Post('/logout')
  logout(@Body() body: S102SessionLogoutDto) {
    return this.service.logout(body.refreshToken)
  }
}
