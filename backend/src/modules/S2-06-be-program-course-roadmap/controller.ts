import { Body, Controller, Post } from '@nestjs/common'
import { S206BeProgramCourseRoadmapService } from './service'

@Controller('sample/s2-06-be-program-course-roadmap')
export class S206BeProgramCourseRoadmapController {
  constructor(private readonly service: S206BeProgramCourseRoadmapService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
