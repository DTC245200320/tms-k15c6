import { Body, Controller, Post } from '@nestjs/common'
import { S602BeRubricGradingService } from './service'

@Controller('sample/s6-02-be-rubric-grading')
export class S602BeRubricGradingController {
  constructor(private readonly service: S602BeRubricGradingService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
