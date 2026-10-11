import { Controller, Get, Module } from '@nestjs/common'
import { AUTH_ROUTES } from './auth/auth.contract'
import { PilotController } from './api/pilot.controller'

@Controller()
class HealthController {
  @Get('/health')
  health() {
    return { status: 'ok', service: 'tms-backend', authRoutes: AUTH_ROUTES }
  }
}

@Module({ controllers: [HealthController, PilotController] })
export class AppModule {}
