import { Module } from '@nestjs/common'
import { S101LoginController } from './controller'
import { S101LoginService } from './service'

@Module({ controllers: [S101LoginController], providers: [S101LoginService], exports: [S101LoginService] })
export class S101LoginModule {}
