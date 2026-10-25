import { Module } from '@nestjs/common'
import { S802BeFinalGradeController } from './controller'
import { S802BeFinalGradeService } from './service'

@Module({ controllers: [S802BeFinalGradeController], providers: [S802BeFinalGradeService], exports: [S802BeFinalGradeService] })
export class S802BeFinalGradeModule {}
