import { Body, Controller, Post } from '@nestjs/common'
import { S509BeLateSubmissionService } from './service'

@Controller('sample/s5-09-be-late-submission')
export class S509BeLateSubmissionController {
  constructor(private readonly service: S509BeLateSubmissionService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
