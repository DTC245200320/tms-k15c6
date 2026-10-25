import { Body, Controller, Post } from '@nestjs/common'
import { S203BeAvatarUploadService } from './service'

@Controller('sample/s2-03-be-avatar-upload')
export class S203BeAvatarUploadController {
  constructor(private readonly service: S203BeAvatarUploadService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
