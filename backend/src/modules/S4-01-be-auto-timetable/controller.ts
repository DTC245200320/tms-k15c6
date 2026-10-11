import { Body, Controller, Post } from '@nestjs/common'
import { S401BeAutoTimetableService } from './service'

@Controller('sample/s4-01-be-auto-timetable')
export class S401BeAutoTimetableController {
  constructor(private readonly service: S401BeAutoTimetableService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
