import { Controller, Get, Module } from '@nestjs/common'
import { AUTH_ROUTES } from './auth/auth.contract'

@Controller()
class HealthController {
  @Get('/health')
  health() {
    return { status: 'ok', service: 'tms-backend', authRoutes: AUTH_ROUTES }
  }
}

@Module({ controllers: [HealthController] })
export class AppModule {}
