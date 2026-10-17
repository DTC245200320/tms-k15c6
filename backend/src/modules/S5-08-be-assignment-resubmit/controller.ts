import { Body, Controller, Post } from '@nestjs/common'
import { S508BeAssignmentResubmitService } from './service'

@Controller('sample/s5-08-be-assignment-resubmit')
export class S508BeAssignmentResubmitController {
  constructor(private readonly service: S508BeAssignmentResubmitService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
