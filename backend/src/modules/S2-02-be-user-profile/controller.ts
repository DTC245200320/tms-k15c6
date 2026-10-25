import { Body, Controller, Post } from '@nestjs/common'
import { S202BeUserProfileService } from './service'

@Controller('sample/s2-02-be-user-profile')
export class S202BeUserProfileController {
  constructor(private readonly service: S202BeUserProfileService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
