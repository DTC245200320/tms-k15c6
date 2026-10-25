import { Body, Controller, Post } from '@nestjs/common'
import { S407BeAttendanceMarkingService } from './service'

@Controller('sample/s4-07-be-attendance-marking')
export class S407BeAttendanceMarkingController {
  constructor(private readonly service: S407BeAttendanceMarkingService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
