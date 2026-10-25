import { Body, Controller, Post } from '@nestjs/common'
import { S806BeSurveyReportService } from './service'

@Controller('sample/s8-06-be-survey-report')
export class S806BeSurveyReportController {
  constructor(private readonly service: S806BeSurveyReportService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
