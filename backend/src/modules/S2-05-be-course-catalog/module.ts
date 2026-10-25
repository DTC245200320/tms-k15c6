import { Module } from '@nestjs/common'
import { S205BeCourseCatalogController } from './controller'
import { S205BeCourseCatalogService } from './service'

@Module({ controllers: [S205BeCourseCatalogController], providers: [S205BeCourseCatalogService], exports: [S205BeCourseCatalogService] })
export class S205BeCourseCatalogModule {}
