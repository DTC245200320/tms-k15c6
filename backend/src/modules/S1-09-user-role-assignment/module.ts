import { Module } from '@nestjs/common'
import { S109UserRoleAssignmentController } from './controller'
import { S109UserRoleAssignmentService } from './service'

@Module({ controllers: [S109UserRoleAssignmentController], providers: [S109UserRoleAssignmentService], exports: [S109UserRoleAssignmentService] })
export class S109UserRoleAssignmentModule {}
