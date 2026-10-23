import { Module } from '@nestjs/common'
import { S203BeAvatarUploadController } from './controller'
import { S203BeAvatarUploadService } from './service'

@Module({ controllers: [S203BeAvatarUploadController], providers: [S203BeAvatarUploadService], exports: [S203BeAvatarUploadService] })
export class S203BeAvatarUploadModule {}
