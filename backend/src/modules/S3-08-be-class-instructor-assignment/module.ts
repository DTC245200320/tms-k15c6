import { Module } from '@nestjs/common'
import { S308BeClassInstructorAssignmentController } from './controller'
import { S308BeClassInstructorAssignmentService } from './service'

@Module({ controllers: [S308BeClassInstructorAssignmentController], providers: [S308BeClassInstructorAssignmentService], exports: [S308BeClassInstructorAssignmentService] })
export class S308BeClassInstructorAssignmentModule {}
