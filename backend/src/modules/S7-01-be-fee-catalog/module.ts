import { Module } from '@nestjs/common'
import { S701BeFeeCatalogController } from './controller'
import { S701BeFeeCatalogService } from './service'

@Module({ controllers: [S701BeFeeCatalogController], providers: [S701BeFeeCatalogService], exports: [S701BeFeeCatalogService] })
export class S701BeFeeCatalogModule {}
