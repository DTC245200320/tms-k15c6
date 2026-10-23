import { Module } from '@nestjs/common'
import { S703BePaymentReceiptController } from './controller'
import { S703BePaymentReceiptService } from './service'

@Module({ controllers: [S703BePaymentReceiptController], providers: [S703BePaymentReceiptService], exports: [S703BePaymentReceiptService] })
export class S703BePaymentReceiptModule {}
