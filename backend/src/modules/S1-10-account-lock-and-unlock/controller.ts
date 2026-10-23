import { Body, Controller, Post } from '@nestjs/common'
import { S110AccountLockAndUnlockService } from './service'

@Controller('sample/s1-10-account-lock-and-unlock')
export class S110AccountLockAndUnlockController {
  constructor(private readonly service: S110AccountLockAndUnlockService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
