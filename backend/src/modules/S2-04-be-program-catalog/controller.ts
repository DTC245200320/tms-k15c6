import { Body, Controller, Post } from '@nestjs/common'
import { S204BeProgramCatalogService } from './service'

@Controller('sample/s2-04-be-program-catalog')
export class S204BeProgramCatalogController {
  constructor(private readonly service: S204BeProgramCatalogService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
