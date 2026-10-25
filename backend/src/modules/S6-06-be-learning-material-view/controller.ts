import { Body, Controller, Post } from '@nestjs/common'
import { S606BeLearningMaterialViewService } from './service'

@Controller('sample/s6-06-be-learning-material-view')
export class S606BeLearningMaterialViewController {
  constructor(private readonly service: S606BeLearningMaterialViewService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
