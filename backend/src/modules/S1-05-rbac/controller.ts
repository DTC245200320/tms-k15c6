import { Body, Controller, Post } from '@nestjs/common'
import { S105RbacService } from './service'

@Controller('sample/s1-05-rbac')
export class S105RbacController {
  constructor(private readonly service: S105RbacService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
