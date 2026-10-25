import { Body, Controller, Post } from '@nestjs/common'
import { S704BeScholarshipDiscountService } from './service'

@Controller('sample/s7-04-be-scholarship-discount')
export class S704BeScholarshipDiscountController {
  constructor(private readonly service: S704BeScholarshipDiscountService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
