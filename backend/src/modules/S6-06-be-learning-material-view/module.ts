import { Module } from '@nestjs/common'
import { S606BeLearningMaterialViewController } from './controller'
import { S606BeLearningMaterialViewService } from './service'

@Module({ controllers: [S606BeLearningMaterialViewController], providers: [S606BeLearningMaterialViewService], exports: [S606BeLearningMaterialViewService] })
export class S606BeLearningMaterialViewModule {}
