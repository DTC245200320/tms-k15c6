import { Body, Controller, Post } from '@nestjs/common'
import { S207BeCourseSessionsService } from './service'

@Controller('sample/s2-07-be-course-sessions')
export class S207BeCourseSessionsController {
  constructor(private readonly service: S207BeCourseSessionsService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
