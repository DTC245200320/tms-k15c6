import { Body, Controller, Post } from '@nestjs/common'
import { S103PasswordResetService } from './service'

@Controller('sample/s1-03-password-reset')
export class S103PasswordResetController {
  constructor(private readonly service: S103PasswordResetService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
