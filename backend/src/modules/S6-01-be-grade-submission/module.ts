import { Module } from '@nestjs/common'
import { S601BeGradeSubmissionController } from './controller'
import { S601BeGradeSubmissionService } from './service'

@Module({ controllers: [S601BeGradeSubmissionController], providers: [S601BeGradeSubmissionService], exports: [S601BeGradeSubmissionService] })
export class S601BeGradeSubmissionModule {}
