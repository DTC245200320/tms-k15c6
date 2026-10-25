import { Body, Controller, Post } from '@nestjs/common'
import { S408BeLeaveRequestService } from './service'

@Controller('sample/s4-08-be-leave-request')
export class S408BeLeaveRequestController {
  constructor(private readonly service: S408BeLeaveRequestService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
