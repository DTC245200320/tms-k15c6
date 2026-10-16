import { Module } from '@nestjs/common'
import { S805BeQualitySurveyController } from './controller'
import { S805BeQualitySurveyService } from './service'

@Module({ controllers: [S805BeQualitySurveyController], providers: [S805BeQualitySurveyService], exports: [S805BeQualitySurveyService] })
export class S805BeQualitySurveyModule {}
