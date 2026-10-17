import { Body, Controller, Post } from '@nestjs/common'
import { S610BeNotificationCenterService } from './service'

@Controller('sample/s6-10-be-notification-center')
export class S610BeNotificationCenterController {
  constructor(private readonly service: S610BeNotificationCenterService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
