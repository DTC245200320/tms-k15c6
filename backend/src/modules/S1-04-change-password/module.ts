import { Module } from '@nestjs/common'
import { S104ChangePasswordController } from './controller'
import { S104ChangePasswordService } from './service'

@Module({ controllers: [S104ChangePasswordController], providers: [S104ChangePasswordService], exports: [S104ChangePasswordService] })
export class S104ChangePasswordModule {}
