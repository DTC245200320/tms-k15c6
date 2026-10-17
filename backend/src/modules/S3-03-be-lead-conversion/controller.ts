import { Body, Controller, Post } from '@nestjs/common'
import { S303BeLeadConversionService } from './service'

@Controller('sample/s3-03-be-lead-conversion')
export class S303BeLeadConversionController {
  constructor(private readonly service: S303BeLeadConversionService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
