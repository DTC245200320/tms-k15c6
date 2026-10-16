import { Body, Controller, Post } from '@nestjs/common'
import { S307BeClassListService } from './service'

@Controller('sample/s3-07-be-class-list')
export class S307BeClassListController {
  constructor(private readonly service: S307BeClassListService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
