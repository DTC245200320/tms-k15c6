import { Module } from '@nestjs/common'
import { S204BeProgramCatalogController } from './controller'
import { S204BeProgramCatalogService } from './service'

@Module({ controllers: [S204BeProgramCatalogController], providers: [S204BeProgramCatalogService], exports: [S204BeProgramCatalogService] })
export class S204BeProgramCatalogModule {}
