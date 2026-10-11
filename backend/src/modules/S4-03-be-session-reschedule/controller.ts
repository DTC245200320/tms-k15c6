import { Body, Controller, Post } from '@nestjs/common'
import { S403BeSessionRescheduleService } from './service'

@Controller('sample/s4-03-be-session-reschedule')
export class S403BeSessionRescheduleController {
  constructor(private readonly service: S403BeSessionRescheduleService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
