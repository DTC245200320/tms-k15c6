import { Module } from '@nestjs/common'
import { S801BeGradeConfigController } from './controller'
import { S801BeGradeConfigService } from './service'

@Module({ controllers: [S801BeGradeConfigController], providers: [S801BeGradeConfigService], exports: [S801BeGradeConfigService] })
export class S801BeGradeConfigModule {}
