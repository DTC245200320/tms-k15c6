import { Body, Controller, Post } from '@nestjs/common'
import { S505BeAssignmentCreateService } from './service'

@Controller('sample/s5-05-be-assignment-create')
export class S505BeAssignmentCreateController {
  constructor(private readonly service: S505BeAssignmentCreateService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
