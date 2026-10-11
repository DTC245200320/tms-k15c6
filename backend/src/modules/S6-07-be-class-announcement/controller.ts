import { Body, Controller, Post } from '@nestjs/common'
import { S607BeClassAnnouncementService } from './service'

@Controller('sample/s6-07-be-class-announcement')
export class S607BeClassAnnouncementController {
  constructor(private readonly service: S607BeClassAnnouncementService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
