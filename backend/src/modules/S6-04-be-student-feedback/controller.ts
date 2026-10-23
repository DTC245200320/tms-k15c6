import { Body, Controller, Post } from '@nestjs/common'
import { S604BeStudentFeedbackService } from './service'

@Controller('sample/s6-04-be-student-feedback')
export class S604BeStudentFeedbackController {
  constructor(private readonly service: S604BeStudentFeedbackService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
