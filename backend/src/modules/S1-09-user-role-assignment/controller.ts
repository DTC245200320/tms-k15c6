import { Body, Controller, Post } from '@nestjs/common'
import { S109UserRoleAssignmentService } from './service'

@Controller('sample/s1-09-user-role-assignment')
export class S109UserRoleAssignmentController {
  constructor(private readonly service: S109UserRoleAssignmentService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
