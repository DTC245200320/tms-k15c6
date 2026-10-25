import { Module } from '@nestjs/common'
import { S402BeTimetableConflictController } from './controller'
import { S402BeTimetableConflictService } from './service'

@Module({ controllers: [S402BeTimetableConflictController], providers: [S402BeTimetableConflictService], exports: [S402BeTimetableConflictService] })
export class S402BeTimetableConflictModule {}
