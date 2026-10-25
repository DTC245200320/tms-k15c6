import { Module } from '@nestjs/common'
import { S804BeGraduationEligibilityController } from './controller'
import { S804BeGraduationEligibilityService } from './service'

@Module({ controllers: [S804BeGraduationEligibilityController], providers: [S804BeGraduationEligibilityService], exports: [S804BeGraduationEligibilityService] })
export class S804BeGraduationEligibilityModule {}
