import { Module } from '@nestjs/common'
import { S307BeClassListController } from './controller'
import { S307BeClassListService } from './service'

@Module({ controllers: [S307BeClassListController], providers: [S307BeClassListService], exports: [S307BeClassListService] })
export class S307BeClassListModule {}
