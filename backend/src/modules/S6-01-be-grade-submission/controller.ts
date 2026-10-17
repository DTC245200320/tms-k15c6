import { Body, Controller, Post } from '@nestjs/common'
import { S601BeGradeSubmissionService } from './service'

@Controller('sample/s6-01-be-grade-submission')
export class S601BeGradeSubmissionController {
  constructor(private readonly service: S601BeGradeSubmissionService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
