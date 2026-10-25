import { Module } from '@nestjs/common'
import { S407BeAttendanceMarkingController } from './controller'
import { S407BeAttendanceMarkingService } from './service'

@Module({ controllers: [S407BeAttendanceMarkingController], providers: [S407BeAttendanceMarkingService], exports: [S407BeAttendanceMarkingService] })
export class S407BeAttendanceMarkingModule {}
