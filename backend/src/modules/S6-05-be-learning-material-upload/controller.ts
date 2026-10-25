import { Body, Controller, Post } from '@nestjs/common'
import { S605BeLearningMaterialUploadService } from './service'

@Controller('sample/s6-05-be-learning-material-upload')
export class S605BeLearningMaterialUploadController {
  constructor(private readonly service: S605BeLearningMaterialUploadService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
