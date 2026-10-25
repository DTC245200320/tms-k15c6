import { Module } from '@nestjs/common'
import { S706BePaymentReminderController } from './controller'
import { S706BePaymentReminderService } from './service'

@Module({ controllers: [S706BePaymentReminderController], providers: [S706BePaymentReminderService], exports: [S706BePaymentReminderService] })
export class S706BePaymentReminderModule {}
