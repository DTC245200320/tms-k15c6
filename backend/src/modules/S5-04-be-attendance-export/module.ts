import { Module } from '@nestjs/common'
import { S504BeAttendanceExportController } from './controller'
import { S504BeAttendanceExportService } from './service'

@Module({ controllers: [S504BeAttendanceExportController], providers: [S504BeAttendanceExportService], exports: [S504BeAttendanceExportService] })
export class S504BeAttendanceExportModule {}
