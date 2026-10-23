import { Module } from '@nestjs/common'
import { S405BeStudentScheduleController } from './controller'
import { S405BeStudentScheduleService } from './service'

@Module({ controllers: [S405BeStudentScheduleController], providers: [S405BeStudentScheduleService], exports: [S405BeStudentScheduleService] })
export class S405BeStudentScheduleModule {}
