import { Body, Controller, Post } from '@nestjs/common'
import { S703BePaymentReceiptService } from './service'

@Controller('sample/s7-03-be-payment-receipt')
export class S703BePaymentReceiptController {
  constructor(private readonly service: S703BePaymentReceiptService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
