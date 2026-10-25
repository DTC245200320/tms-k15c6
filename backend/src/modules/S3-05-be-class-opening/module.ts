import { Module } from '@nestjs/common'
import { S305BeClassOpeningController } from './controller'
import { S305BeClassOpeningService } from './service'

@Module({ controllers: [S305BeClassOpeningController], providers: [S305BeClassOpeningService], exports: [S305BeClassOpeningService] })
export class S305BeClassOpeningModule {}
