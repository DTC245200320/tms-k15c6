import { Module } from '@nestjs/common'
import { S702BePaymentPlanController } from './controller'
import { S702BePaymentPlanService } from './service'

@Module({ controllers: [S702BePaymentPlanController], providers: [S702BePaymentPlanService], exports: [S702BePaymentPlanService] })
export class S702BePaymentPlanModule {}
