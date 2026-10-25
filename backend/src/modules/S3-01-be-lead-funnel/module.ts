import { Module } from '@nestjs/common'
import { S301BeLeadFunnelController } from './controller'
import { S301BeLeadFunnelService } from './service'

@Module({ controllers: [S301BeLeadFunnelController], providers: [S301BeLeadFunnelService], exports: [S301BeLeadFunnelService] })
export class S301BeLeadFunnelModule {}
