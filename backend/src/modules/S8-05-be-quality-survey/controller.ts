import { Body, Controller, Post } from '@nestjs/common'
import { S805BeQualitySurveyService } from './service'

@Controller('sample/s8-05-be-quality-survey')
export class S805BeQualitySurveyController {
  constructor(private readonly service: S805BeQualitySurveyService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
