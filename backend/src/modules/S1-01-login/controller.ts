import { Body, Controller, Post } from '@nestjs/common'
import { S101LoginService } from './service'

@Controller('sample/s1-01-login')
export class S101LoginController {
  constructor(private readonly service: S101LoginService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
