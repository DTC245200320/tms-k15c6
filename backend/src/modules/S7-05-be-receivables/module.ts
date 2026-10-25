import { Module } from '@nestjs/common'
import { S705BeReceivablesController } from './controller'
import { S705BeReceivablesService } from './service'

@Module({ controllers: [S705BeReceivablesController], providers: [S705BeReceivablesService], exports: [S705BeReceivablesService] })
export class S705BeReceivablesModule {}
