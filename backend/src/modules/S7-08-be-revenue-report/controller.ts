import { Body, Controller, Post } from '@nestjs/common'
import { S708BeRevenueReportService } from './service'

@Controller('sample/s7-08-be-revenue-report')
export class S708BeRevenueReportController {
  constructor(private readonly service: S708BeRevenueReportService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
