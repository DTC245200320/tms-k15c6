import { Body, Controller, Post } from '@nestjs/common'
import { S405BeStudentScheduleService } from './service'

@Controller('sample/s4-05-be-student-schedule')
export class S405BeStudentScheduleController {
  constructor(private readonly service: S405BeStudentScheduleService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
