import { Module } from '@nestjs/common'
import { S304BeStudentProfileController } from './controller'
import { S304BeStudentProfileService } from './service'

@Module({ controllers: [S304BeStudentProfileController], providers: [S304BeStudentProfileService], exports: [S304BeStudentProfileService] })
export class S304BeStudentProfileModule {}
