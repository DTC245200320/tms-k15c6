import { Module } from '@nestjs/common'
import { S803BeTranscriptExportController } from './controller'
import { S803BeTranscriptExportService } from './service'

@Module({ controllers: [S803BeTranscriptExportController], providers: [S803BeTranscriptExportService], exports: [S803BeTranscriptExportService] })
export class S803BeTranscriptExportModule {}
