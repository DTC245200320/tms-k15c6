import { Module } from '@nestjs/common'
import { S604BeStudentFeedbackController } from './controller'
import { S604BeStudentFeedbackService } from './service'

@Module({ controllers: [S604BeStudentFeedbackController], providers: [S604BeStudentFeedbackService], exports: [S604BeStudentFeedbackService] })
export class S604BeStudentFeedbackModule {}
