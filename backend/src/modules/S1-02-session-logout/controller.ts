import { Body, Controller, Post } from '@nestjs/common'
import { S102SessionLogoutService } from './service'

@Controller('sample/s1-02-session-logout')
export class S102SessionLogoutController {
  constructor(private readonly service: S102SessionLogoutService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
