import { Body, Controller, Post } from '@nestjs/common'
import { S801BeGradeConfigService } from './service'

@Controller('sample/s8-01-be-grade-config')
export class S801BeGradeConfigController {
  constructor(private readonly service: S801BeGradeConfigService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
