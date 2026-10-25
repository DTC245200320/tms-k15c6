import { Module } from '@nestjs/common'
import { S108UserAccountController } from './controller'
import { S108UserAccountService } from './service'

@Module({ controllers: [S108UserAccountController], providers: [S108UserAccountService], exports: [S108UserAccountService] })
export class S108UserAccountModule {}
