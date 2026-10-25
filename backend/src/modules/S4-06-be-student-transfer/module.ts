import { Module } from '@nestjs/common'
import { S406BeStudentTransferController } from './controller'
import { S406BeStudentTransferService } from './service'

@Module({ controllers: [S406BeStudentTransferController], providers: [S406BeStudentTransferService], exports: [S406BeStudentTransferService] })
export class S406BeStudentTransferModule {}
