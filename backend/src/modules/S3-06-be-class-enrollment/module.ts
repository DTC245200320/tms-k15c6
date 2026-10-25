import { Module } from '@nestjs/common'
import { S306BeClassEnrollmentController } from './controller'
import { S306BeClassEnrollmentService } from './service'

@Module({ controllers: [S306BeClassEnrollmentController], providers: [S306BeClassEnrollmentService], exports: [S306BeClassEnrollmentService] })
export class S306BeClassEnrollmentModule {}
