import { Body, Controller, Post } from '@nestjs/common'
import { S301BeLeadFunnelService } from './service'

@Controller('sample/s3-01-be-lead-funnel')
export class S301BeLeadFunnelController {
  constructor(private readonly service: S301BeLeadFunnelService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
