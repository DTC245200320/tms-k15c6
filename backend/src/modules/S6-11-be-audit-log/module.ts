import { Module } from '@nestjs/common'
import { S611BeAuditLogController } from './controller'
import { S611BeAuditLogService } from './service'

@Module({ controllers: [S611BeAuditLogController], providers: [S611BeAuditLogService], exports: [S611BeAuditLogService] })
export class S611BeAuditLogModule {}
