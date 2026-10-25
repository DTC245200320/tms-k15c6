import { Module } from '@nestjs/common'
import { S107UnauthorizedAndForbiddenHandlingController } from './controller'
import { S107UnauthorizedAndForbiddenHandlingService } from './service'

@Module({ controllers: [S107UnauthorizedAndForbiddenHandlingController], providers: [S107UnauthorizedAndForbiddenHandlingService], exports: [S107UnauthorizedAndForbiddenHandlingService] })
export class S107UnauthorizedAndForbiddenHandlingModule {}
