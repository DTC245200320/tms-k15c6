import { Body, Controller, Post } from '@nestjs/common'
import { S611BeAuditLogService } from './service'

@Controller('sample/s6-11-be-audit-log')
export class S611BeAuditLogController {
  constructor(private readonly service: S611BeAuditLogService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
