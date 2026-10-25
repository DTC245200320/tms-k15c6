import { Body, Controller, Post } from '@nestjs/common'
import { S804BeGraduationEligibilityService } from './service'

@Controller('sample/s8-04-be-graduation-eligibility')
export class S804BeGraduationEligibilityController {
  constructor(private readonly service: S804BeGraduationEligibilityService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
