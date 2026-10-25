import { Module } from '@nestjs/common'
import { S303BeLeadConversionController } from './controller'
import { S303BeLeadConversionService } from './service'

@Module({ controllers: [S303BeLeadConversionController], providers: [S303BeLeadConversionService], exports: [S303BeLeadConversionService] })
export class S303BeLeadConversionModule {}
