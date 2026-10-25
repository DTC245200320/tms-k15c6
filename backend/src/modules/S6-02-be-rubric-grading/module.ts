import { Module } from '@nestjs/common'
import { S602BeRubricGradingController } from './controller'
import { S602BeRubricGradingService } from './service'

@Module({ controllers: [S602BeRubricGradingController], providers: [S602BeRubricGradingService], exports: [S602BeRubricGradingService] })
export class S602BeRubricGradingModule {}
