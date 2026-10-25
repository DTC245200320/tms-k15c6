import { Body, Controller, Post } from '@nestjs/common'
import { S208BePublicConsultationFormService } from './service'

@Controller('sample/s2-08-be-public-consultation-form')
export class S208BePublicConsultationFormController {
  constructor(private readonly service: S208BePublicConsultationFormService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
