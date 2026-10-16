import { Body, Controller, Post } from '@nestjs/common'
import { S504BeAttendanceExportService } from './service'

@Controller('sample/s5-04-be-attendance-export')
export class S504BeAttendanceExportController {
  constructor(private readonly service: S504BeAttendanceExportService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
