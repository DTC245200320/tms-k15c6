import { Module } from '@nestjs/common'
import { S605BeLearningMaterialUploadController } from './controller'
import { S605BeLearningMaterialUploadService } from './service'

@Module({ controllers: [S605BeLearningMaterialUploadController], providers: [S605BeLearningMaterialUploadService], exports: [S605BeLearningMaterialUploadService] })
export class S605BeLearningMaterialUploadModule {}
