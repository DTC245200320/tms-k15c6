import { Body, Controller, Post } from '@nestjs/common'
import { S305BeClassOpeningService } from './service'

@Controller('sample/s3-05-be-class-opening')
export class S305BeClassOpeningController {
  constructor(private readonly service: S305BeClassOpeningService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
