import { Module } from '@nestjs/common'
import { S404BeTimetableCalendarController } from './controller'
import { S404BeTimetableCalendarService } from './service'

@Module({ controllers: [S404BeTimetableCalendarController], providers: [S404BeTimetableCalendarService], exports: [S404BeTimetableCalendarService] })
export class S404BeTimetableCalendarModule {}
