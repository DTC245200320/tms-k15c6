import { Module } from '@nestjs/common'
import { S103PasswordResetController } from './controller'
import { S103PasswordResetService } from './service'

@Module({ controllers: [S103PasswordResetController], providers: [S103PasswordResetService], exports: [S103PasswordResetService] })
export class S103PasswordResetModule {}
