import { Body, Controller, Post } from '@nestjs/common'
import { S706BePaymentReminderService } from './service'

@Controller('sample/s7-06-be-payment-reminder')
export class S706BePaymentReminderController {
  constructor(private readonly service: S706BePaymentReminderService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
