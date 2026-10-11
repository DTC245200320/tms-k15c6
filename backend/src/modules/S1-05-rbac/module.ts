import { Module } from '@nestjs/common'
import { S105RbacController } from './controller'
import { S105RbacService } from './service'

@Module({ controllers: [S105RbacController], providers: [S105RbacService], exports: [S105RbacService] })
export class S105RbacModule {}
