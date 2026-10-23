import { Module } from '@nestjs/common'
import { DatabaseModule } from '../../database/database.module'
import { S102SessionLogoutController } from './controller'
import { S102SessionLogoutService } from './service'

@Module({ imports: [DatabaseModule], controllers: [S102SessionLogoutController], providers: [S102SessionLogoutService], exports: [S102SessionLogoutService] })
export class S102SessionLogoutModule {}
