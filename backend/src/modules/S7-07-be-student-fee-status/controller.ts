import { Body, Controller, Post } from '@nestjs/common'
import { S707BeStudentFeeStatusService } from './service'

@Controller('sample/s7-07-be-student-fee-status')
export class S707BeStudentFeeStatusController {
  constructor(private readonly service: S707BeStudentFeeStatusService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
