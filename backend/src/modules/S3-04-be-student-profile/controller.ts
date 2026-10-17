import { Body, Controller, Post } from '@nestjs/common'
import { S304BeStudentProfileService } from './service'

@Controller('sample/s3-04-be-student-profile')
export class S304BeStudentProfileController {
  constructor(private readonly service: S304BeStudentProfileService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
