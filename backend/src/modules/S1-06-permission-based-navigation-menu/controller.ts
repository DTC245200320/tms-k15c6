import { Body, Controller, Post } from '@nestjs/common'
import { S106PermissionBasedNavigationMenuService } from './service'

@Controller('sample/s1-06-permission-based-navigation-menu')
export class S106PermissionBasedNavigationMenuController {
  constructor(private readonly service: S106PermissionBasedNavigationMenuService) {}

  @Post('execute')
  execute(@Body() payload: Record<string, unknown>) {
    return this.service.execute(payload)
  }
}
