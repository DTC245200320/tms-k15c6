import { Module } from '@nestjs/common'
import { S503BeStudentAttendanceHistoryController } from './controller'
import { S503BeStudentAttendanceHistoryService } from './service'

@Module({ controllers: [S503BeStudentAttendanceHistoryController], providers: [S503BeStudentAttendanceHistoryService], exports: [S503BeStudentAttendanceHistoryService] })
export class S503BeStudentAttendanceHistoryModule {}
