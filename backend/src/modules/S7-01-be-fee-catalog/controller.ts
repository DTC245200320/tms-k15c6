import { Body, Controller, Post } from '@nestjs/common'
import { S701BeFeeCatalogService } from './service'

@Controller('sample/s7-01-be-fee-catalog')
export class S701BeFeeCatalogController {
  constructor(private readonly service: S701BeFeeCatalogService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
