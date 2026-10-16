import { Module } from '@nestjs/common'
import { S211BeLeadSearchFilterController } from './controller'
import { S211BeLeadSearchFilterService } from './service'

@Module({ controllers: [S211BeLeadSearchFilterController], providers: [S211BeLeadSearchFilterService], exports: [S211BeLeadSearchFilterService] })
export class S211BeLeadSearchFilterModule {}
