import { Body, Controller, Post } from '@nestjs/common'
import { S503BeStudentAttendanceHistoryService } from './service'

@Controller('sample/s5-03-be-student-attendance-history')
export class S503BeStudentAttendanceHistoryController {
  constructor(private readonly service: S503BeStudentAttendanceHistoryService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
