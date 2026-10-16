import { Body, Controller, Post } from '@nestjs/common'
import { S302BeLeadFollowUpService } from './service'

@Controller('sample/s3-02-be-lead-follow-up')
export class S302BeLeadFollowUpController {
  constructor(private readonly service: S302BeLeadFollowUpService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
