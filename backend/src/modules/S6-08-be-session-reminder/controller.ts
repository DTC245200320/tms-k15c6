import { Body, Controller, Post } from '@nestjs/common'
import { S608BeSessionReminderService } from './service'

@Controller('sample/s6-08-be-session-reminder')
export class S608BeSessionReminderController {
  constructor(private readonly service: S608BeSessionReminderService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
