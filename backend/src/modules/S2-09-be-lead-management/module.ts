import { Module } from '@nestjs/common'
import { S209BeLeadManagementController } from './controller'
import { S209BeLeadManagementService } from './service'

@Module({ controllers: [S209BeLeadManagementController], providers: [S209BeLeadManagementService], exports: [S209BeLeadManagementService] })
export class S209BeLeadManagementModule {}
