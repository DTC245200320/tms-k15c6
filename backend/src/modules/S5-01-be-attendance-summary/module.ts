import { Module } from '@nestjs/common'
import { S501BeAttendanceSummaryController } from './controller'
import { S501BeAttendanceSummaryService } from './service'

@Module({ controllers: [S501BeAttendanceSummaryController], providers: [S501BeAttendanceSummaryService], exports: [S501BeAttendanceSummaryService] })
export class S501BeAttendanceSummaryModule {}
