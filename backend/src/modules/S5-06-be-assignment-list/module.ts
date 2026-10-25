import { Module } from '@nestjs/common'
import { S506BeAssignmentListController } from './controller'
import { S506BeAssignmentListService } from './service'

@Module({ controllers: [S506BeAssignmentListController], providers: [S506BeAssignmentListService], exports: [S506BeAssignmentListService] })
export class S506BeAssignmentListModule {}
