import { Controller, Get, Module } from '@nestjs/common'
import { AUTH_ROUTES } from './auth/auth.contract'
import { PilotController } from './api/pilot.controller'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth/auth.controller'
import { AuthService } from './auth/auth.service'
import { DatabaseService } from './database/database.service'

@Controller()
class HealthController {
  @Get('/health')
  health() {
    return { status: 'ok', service: 'tms-backend', authRoutes: AUTH_ROUTES }
  }
}

@Module({ imports: [JwtModule.register({ secret: process.env.JWT_ACCESS_SECRET ?? 'tms-dev-secret-change-me' })], controllers: [HealthController, PilotController, AuthController], providers: [AuthService, DatabaseService] })
export class AppModule {}
