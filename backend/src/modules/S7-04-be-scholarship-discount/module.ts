import { Module } from '@nestjs/common'
import { S704BeScholarshipDiscountController } from './controller'
import { S704BeScholarshipDiscountService } from './service'

@Module({ controllers: [S704BeScholarshipDiscountController], providers: [S704BeScholarshipDiscountService], exports: [S704BeScholarshipDiscountService] })
export class S704BeScholarshipDiscountModule {}
