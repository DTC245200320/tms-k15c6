import { Body, Controller, Post } from '@nestjs/common'
import { S210BeLeadAssignmentService } from './service'

@Controller('sample/s2-10-be-lead-assignment')
export class S210BeLeadAssignmentController {
  constructor(private readonly service: S210BeLeadAssignmentService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
