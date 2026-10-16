import { Module } from '@nestjs/common'
import { S207BeCourseSessionsController } from './controller'
import { S207BeCourseSessionsService } from './service'

@Module({ controllers: [S207BeCourseSessionsController], providers: [S207BeCourseSessionsService], exports: [S207BeCourseSessionsService] })
export class S207BeCourseSessionsModule {}
