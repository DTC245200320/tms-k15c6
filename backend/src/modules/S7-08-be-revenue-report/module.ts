import { Module } from '@nestjs/common'
import { S708BeRevenueReportController } from './controller'
import { S708BeRevenueReportService } from './service'

@Module({ controllers: [S708BeRevenueReportController], providers: [S708BeRevenueReportService], exports: [S708BeRevenueReportService] })
export class S708BeRevenueReportModule {}
