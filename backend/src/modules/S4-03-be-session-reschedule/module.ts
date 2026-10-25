import { Module } from '@nestjs/common'
import { S403BeSessionRescheduleController } from './controller'
import { S403BeSessionRescheduleService } from './service'

@Module({ controllers: [S403BeSessionRescheduleController], providers: [S403BeSessionRescheduleService], exports: [S403BeSessionRescheduleService] })
export class S403BeSessionRescheduleModule {}
