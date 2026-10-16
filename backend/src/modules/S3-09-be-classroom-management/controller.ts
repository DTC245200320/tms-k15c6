import { Body, Controller, Post } from '@nestjs/common'
import { S309BeClassroomManagementService } from './service'

@Controller('sample/s3-09-be-classroom-management')
export class S309BeClassroomManagementController {
  constructor(private readonly service: S309BeClassroomManagementService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
