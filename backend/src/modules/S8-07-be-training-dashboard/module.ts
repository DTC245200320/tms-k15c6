import { Module } from '@nestjs/common'
import { S807BeTrainingDashboardController } from './controller'
import { S807BeTrainingDashboardService } from './service'

@Module({ controllers: [S807BeTrainingDashboardController], providers: [S807BeTrainingDashboardService], exports: [S807BeTrainingDashboardService] })
export class S807BeTrainingDashboardModule {}
