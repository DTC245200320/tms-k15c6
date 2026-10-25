import { Body, Controller, Post } from '@nestjs/common'
import { S201BeBulkImportUsersService } from './service'

@Controller('sample/s2-01-be-bulk-import-users')
export class S201BeBulkImportUsersController {
  constructor(private readonly service: S201BeBulkImportUsersService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
