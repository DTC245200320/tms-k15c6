import { Body, Controller, Post } from '@nestjs/common'
import { S803BeTranscriptExportService } from './service'

@Controller('sample/s8-03-be-transcript-export')
export class S803BeTranscriptExportController {
  constructor(private readonly service: S803BeTranscriptExportService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
