import { Body, Controller, Post } from '@nestjs/common'
import { S802BeFinalGradeService } from './service'

@Controller('sample/s8-02-be-final-grade')
export class S802BeFinalGradeController {
  constructor(private readonly service: S802BeFinalGradeService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
