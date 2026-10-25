import { Body, Controller, Post } from '@nestjs/common'
import { S510BeSubmissionReviewService } from './service'

@Controller('sample/s5-10-be-submission-review')
export class S510BeSubmissionReviewController {
  constructor(private readonly service: S510BeSubmissionReviewService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
