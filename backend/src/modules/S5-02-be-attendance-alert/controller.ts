import { Body, Controller, Post } from '@nestjs/common'
import { S502BeAttendanceAlertService } from './service'

@Controller('sample/s5-02-be-attendance-alert')
export class S502BeAttendanceAlertController {
  constructor(private readonly service: S502BeAttendanceAlertService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
