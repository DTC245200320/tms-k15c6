import { Body, Controller, Post } from '@nestjs/common'
import { S209BeLeadManagementService } from './service'

@Controller('sample/s2-09-be-lead-management')
export class S209BeLeadManagementController {
  constructor(private readonly service: S209BeLeadManagementService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
