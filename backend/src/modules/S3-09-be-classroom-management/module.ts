import { Module } from '@nestjs/common'
import { S309BeClassroomManagementController } from './controller'
import { S309BeClassroomManagementService } from './service'

@Module({ controllers: [S309BeClassroomManagementController], providers: [S309BeClassroomManagementService], exports: [S309BeClassroomManagementService] })
export class S309BeClassroomManagementModule {}
