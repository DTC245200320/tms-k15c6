import { Body, Controller, Post } from '@nestjs/common'
import { S308BeClassInstructorAssignmentService } from './service'

@Controller('sample/s3-08-be-class-instructor-assignment')
export class S308BeClassInstructorAssignmentController {
  constructor(private readonly service: S308BeClassInstructorAssignmentService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
