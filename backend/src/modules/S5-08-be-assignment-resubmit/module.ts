import { Module } from '@nestjs/common'
import { S508BeAssignmentResubmitController } from './controller'
import { S508BeAssignmentResubmitService } from './service'

@Module({ controllers: [S508BeAssignmentResubmitController], providers: [S508BeAssignmentResubmitService], exports: [S508BeAssignmentResubmitService] })
export class S508BeAssignmentResubmitModule {}
