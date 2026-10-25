import { Body, Controller, Post } from '@nestjs/common'
import { S609BeEventNotificationService } from './service'

@Controller('sample/s6-09-be-event-notification')
export class S609BeEventNotificationController {
  constructor(private readonly service: S609BeEventNotificationService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
