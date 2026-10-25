import { Module } from '@nestjs/common'
import { S609BeEventNotificationController } from './controller'
import { S609BeEventNotificationService } from './service'

@Module({ controllers: [S609BeEventNotificationController], providers: [S609BeEventNotificationService], exports: [S609BeEventNotificationService] })
export class S609BeEventNotificationModule {}
