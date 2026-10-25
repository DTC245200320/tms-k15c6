import { Module } from '@nestjs/common'
import { S208BePublicConsultationFormController } from './controller'
import { S208BePublicConsultationFormService } from './service'

@Module({ controllers: [S208BePublicConsultationFormController], providers: [S208BePublicConsultationFormService], exports: [S208BePublicConsultationFormService] })
export class S208BePublicConsultationFormModule {}
