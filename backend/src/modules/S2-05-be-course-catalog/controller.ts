import { Body, Controller, Post } from '@nestjs/common'
import { S205BeCourseCatalogService } from './service'

@Controller('sample/s2-05-be-course-catalog')
export class S205BeCourseCatalogController {
  constructor(private readonly service: S205BeCourseCatalogService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
