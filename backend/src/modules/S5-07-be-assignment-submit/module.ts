import { Module } from '@nestjs/common'
import { S507BeAssignmentSubmitController } from './controller'
import { S507BeAssignmentSubmitService } from './service'

@Module({ controllers: [S507BeAssignmentSubmitController], providers: [S507BeAssignmentSubmitService], exports: [S507BeAssignmentSubmitService] })
export class S507BeAssignmentSubmitModule {}
