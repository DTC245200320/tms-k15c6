import { Module } from '@nestjs/common'
import { S608BeSessionReminderController } from './controller'
import { S608BeSessionReminderService } from './service'

@Module({ controllers: [S608BeSessionReminderController], providers: [S608BeSessionReminderService], exports: [S608BeSessionReminderService] })
export class S608BeSessionReminderModule {}
