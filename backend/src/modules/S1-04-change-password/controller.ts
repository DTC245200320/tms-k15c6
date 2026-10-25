import { Body, Controller, Post } from '@nestjs/common'
import { S104ChangePasswordService } from './service'

@Controller('sample/s1-04-change-password')
export class S104ChangePasswordController {
  constructor(private readonly service: S104ChangePasswordService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
