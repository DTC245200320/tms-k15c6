import { Body, Controller, Post } from '@nestjs/common'
import { S705BeReceivablesService } from './service'

@Controller('sample/s7-05-be-receivables')
export class S705BeReceivablesController {
  constructor(private readonly service: S705BeReceivablesService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
