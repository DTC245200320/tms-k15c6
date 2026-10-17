import { Body, Controller, Post } from '@nestjs/common'
import { S506BeAssignmentListService } from './service'

@Controller('sample/s5-06-be-assignment-list')
export class S506BeAssignmentListController {
  constructor(private readonly service: S506BeAssignmentListService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
