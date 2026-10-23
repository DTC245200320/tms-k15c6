import { Body, Controller, Post } from '@nestjs/common'
import { S402BeTimetableConflictService } from './service'

@Controller('sample/s4-02-be-timetable-conflict')
export class S402BeTimetableConflictController {
  constructor(private readonly service: S402BeTimetableConflictService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
