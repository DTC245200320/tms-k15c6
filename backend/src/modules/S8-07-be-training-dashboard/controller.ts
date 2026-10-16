import { Body, Controller, Post } from '@nestjs/common'
import { S807BeTrainingDashboardService } from './service'

@Controller('sample/s8-07-be-training-dashboard')
export class S807BeTrainingDashboardController {
  constructor(private readonly service: S807BeTrainingDashboardService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
