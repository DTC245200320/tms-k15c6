import { Body, Controller, Post } from '@nestjs/common'
import { S107UnauthorizedAndForbiddenHandlingService } from './service'

@Controller('sample/s1-07-unauthorized-and-forbidden-handling')
export class S107UnauthorizedAndForbiddenHandlingController {
  constructor(private readonly service: S107UnauthorizedAndForbiddenHandlingService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
