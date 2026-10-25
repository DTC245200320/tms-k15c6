import { Body, Controller, Post } from '@nestjs/common'
import { S808BeInstructorDashboardService } from './service'

@Controller('sample/s8-08-be-instructor-dashboard')
export class S808BeInstructorDashboardController {
  constructor(private readonly service: S808BeInstructorDashboardService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
