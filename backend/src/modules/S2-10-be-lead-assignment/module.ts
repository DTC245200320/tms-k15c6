import { Module } from '@nestjs/common'
import { S210BeLeadAssignmentController } from './controller'
import { S210BeLeadAssignmentService } from './service'

@Module({ controllers: [S210BeLeadAssignmentController], providers: [S210BeLeadAssignmentService], exports: [S210BeLeadAssignmentService] })
export class S210BeLeadAssignmentModule {}
