import { Body, Controller, Post } from '@nestjs/common'
import { S603BeRequestResubmissionService } from './service'

@Controller('sample/s6-03-be-request-resubmission')
export class S603BeRequestResubmissionController {
  constructor(private readonly service: S603BeRequestResubmissionService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
