import { Body, Controller, Post } from '@nestjs/common'
import { S507BeAssignmentSubmitService } from './service'

@Controller('sample/s5-07-be-assignment-submit')
export class S507BeAssignmentSubmitController {
  constructor(private readonly service: S507BeAssignmentSubmitService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
