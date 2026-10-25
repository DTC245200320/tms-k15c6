import { Module } from '@nestjs/common'
import { S401BeAutoTimetableController } from './controller'
import { S401BeAutoTimetableService } from './service'

@Module({ controllers: [S401BeAutoTimetableController], providers: [S401BeAutoTimetableService], exports: [S401BeAutoTimetableService] })
export class S401BeAutoTimetableModule {}
