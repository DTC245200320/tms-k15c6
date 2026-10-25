import { Body, Controller, Post } from '@nestjs/common'
import { S404BeTimetableCalendarService } from './service'

@Controller('sample/s4-04-be-timetable-calendar')
export class S404BeTimetableCalendarController {
  constructor(private readonly service: S404BeTimetableCalendarService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
