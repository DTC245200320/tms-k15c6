import { Module } from '@nestjs/common'
import { S806BeSurveyReportController } from './controller'
import { S806BeSurveyReportService } from './service'

@Module({ controllers: [S806BeSurveyReportController], providers: [S806BeSurveyReportService], exports: [S806BeSurveyReportService] })
export class S806BeSurveyReportModule {}
