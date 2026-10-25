import { Body, Controller, Post } from '@nestjs/common'
import { S406BeStudentTransferService } from './service'

@Controller('sample/s4-06-be-student-transfer')
export class S406BeStudentTransferController {
  constructor(private readonly service: S406BeStudentTransferService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
