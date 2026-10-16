import { Module } from '@nestjs/common'
import { S707BeStudentFeeStatusController } from './controller'
import { S707BeStudentFeeStatusService } from './service'

@Module({ controllers: [S707BeStudentFeeStatusController], providers: [S707BeStudentFeeStatusService], exports: [S707BeStudentFeeStatusService] })
export class S707BeStudentFeeStatusModule {}
