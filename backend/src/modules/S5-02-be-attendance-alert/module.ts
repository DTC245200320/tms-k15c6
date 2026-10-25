import { Module } from '@nestjs/common'
import { S502BeAttendanceAlertController } from './controller'
import { S502BeAttendanceAlertService } from './service'

@Module({ controllers: [S502BeAttendanceAlertController], providers: [S502BeAttendanceAlertService], exports: [S502BeAttendanceAlertService] })
export class S502BeAttendanceAlertModule {}
