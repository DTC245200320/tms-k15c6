import { Module } from '@nestjs/common'
import { S201BeBulkImportUsersController } from './controller'
import { S201BeBulkImportUsersService } from './service'

@Module({ controllers: [S201BeBulkImportUsersController], providers: [S201BeBulkImportUsersService], exports: [S201BeBulkImportUsersService] })
export class S201BeBulkImportUsersModule {}
