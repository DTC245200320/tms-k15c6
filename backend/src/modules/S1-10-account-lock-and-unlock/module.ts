import { Module } from '@nestjs/common'
import { S110AccountLockAndUnlockController } from './controller'
import { S110AccountLockAndUnlockService } from './service'

@Module({ controllers: [S110AccountLockAndUnlockController], providers: [S110AccountLockAndUnlockService], exports: [S110AccountLockAndUnlockService] })
export class S110AccountLockAndUnlockModule {}
