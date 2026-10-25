import { Body, Controller, Post } from '@nestjs/common'
import { S108UserAccountService } from './service'

@Controller('sample/s1-08-user-account')
export class S108UserAccountController {
  constructor(private readonly service: S108UserAccountService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
