import { Module } from '@nestjs/common'
import { S505BeAssignmentCreateController } from './controller'
import { S505BeAssignmentCreateService } from './service'

@Module({ controllers: [S505BeAssignmentCreateController], providers: [S505BeAssignmentCreateService], exports: [S505BeAssignmentCreateService] })
export class S505BeAssignmentCreateModule {}
