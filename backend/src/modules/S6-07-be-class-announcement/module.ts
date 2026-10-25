import { Module } from '@nestjs/common'
import { S607BeClassAnnouncementController } from './controller'
import { S607BeClassAnnouncementService } from './service'

@Module({ controllers: [S607BeClassAnnouncementController], providers: [S607BeClassAnnouncementService], exports: [S607BeClassAnnouncementService] })
export class S607BeClassAnnouncementModule {}
