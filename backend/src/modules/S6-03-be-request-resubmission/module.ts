import { Module } from '@nestjs/common'
import { S603BeRequestResubmissionController } from './controller'
import { S603BeRequestResubmissionService } from './service'

@Module({ controllers: [S603BeRequestResubmissionController], providers: [S603BeRequestResubmissionService], exports: [S603BeRequestResubmissionService] })
export class S603BeRequestResubmissionModule {}
