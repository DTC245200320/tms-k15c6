import { Body, Controller, Post } from '@nestjs/common'
import { S211BeLeadSearchFilterService } from './service'

@Controller('sample/s2-11-be-lead-search-filter')
export class S211BeLeadSearchFilterController {
  constructor(private readonly service: S211BeLeadSearchFilterService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
