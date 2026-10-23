import { Body, Controller, Post } from '@nestjs/common'
import { S306BeClassEnrollmentService } from './service'

@Controller('sample/s3-06-be-class-enrollment')
export class S306BeClassEnrollmentController {
  constructor(private readonly service: S306BeClassEnrollmentService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
