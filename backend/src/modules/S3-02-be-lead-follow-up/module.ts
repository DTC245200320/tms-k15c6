import { Module } from '@nestjs/common'
import { S302BeLeadFollowUpController } from './controller'
import { S302BeLeadFollowUpService } from './service'

@Module({ controllers: [S302BeLeadFollowUpController], providers: [S302BeLeadFollowUpService], exports: [S302BeLeadFollowUpService] })
export class S302BeLeadFollowUpModule {}
