import { Module } from '@nestjs/common'
import { S408BeLeaveRequestController } from './controller'
import { S408BeLeaveRequestService } from './service'

@Module({ controllers: [S408BeLeaveRequestController], providers: [S408BeLeaveRequestService], exports: [S408BeLeaveRequestService] })
export class S408BeLeaveRequestModule {}
