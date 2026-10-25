import { Module } from '@nestjs/common'
import { S808BeInstructorDashboardController } from './controller'
import { S808BeInstructorDashboardService } from './service'

@Module({ controllers: [S808BeInstructorDashboardController], providers: [S808BeInstructorDashboardService], exports: [S808BeInstructorDashboardService] })
export class S808BeInstructorDashboardModule {}
