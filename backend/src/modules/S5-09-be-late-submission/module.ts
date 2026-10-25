import { Module } from '@nestjs/common'
import { S509BeLateSubmissionController } from './controller'
import { S509BeLateSubmissionService } from './service'

@Module({ controllers: [S509BeLateSubmissionController], providers: [S509BeLateSubmissionService], exports: [S509BeLateSubmissionService] })
export class S509BeLateSubmissionModule {}
