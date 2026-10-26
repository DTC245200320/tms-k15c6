import { Module } from '@nestjs/common'
import { S510BeSubmissionReviewController } from './controller'
import { S510BeSubmissionReviewService } from './service'

@Module({ controllers: [S510BeSubmissionReviewController], providers: [S510BeSubmissionReviewService], exports: [S510BeSubmissionReviewService] })
export class S510BeSubmissionReviewModule {}
