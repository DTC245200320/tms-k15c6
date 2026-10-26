import { Module } from '@nestjs/common'
import { S610BeNotificationCenterController } from './controller'
import { S610BeNotificationCenterService } from './service'

@Module({ controllers: [S610BeNotificationCenterController], providers: [S610BeNotificationCenterService], exports: [S610BeNotificationCenterService] })
export class S610BeNotificationCenterModule {}
