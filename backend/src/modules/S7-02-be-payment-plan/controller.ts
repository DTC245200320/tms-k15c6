import { Body, Controller, Post } from '@nestjs/common'
import { S702BePaymentPlanService } from './service'

@Controller('sample/s7-02-be-payment-plan')
export class S702BePaymentPlanController {
  constructor(private readonly service: S702BePaymentPlanService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
