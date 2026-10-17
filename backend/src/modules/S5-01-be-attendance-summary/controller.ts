import { Body, Controller, Post } from '@nestjs/common'
import { S501BeAttendanceSummaryService } from './service'

@Controller('sample/s5-01-be-attendance-summary')
export class S501BeAttendanceSummaryController {
  constructor(private readonly service: S501BeAttendanceSummaryService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
