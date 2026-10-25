import { Module } from '@nestjs/common'
import { S202BeUserProfileController } from './controller'
import { S202BeUserProfileService } from './service'

@Module({ controllers: [S202BeUserProfileController], providers: [S202BeUserProfileService], exports: [S202BeUserProfileService] })
export class S202BeUserProfileModule {}
