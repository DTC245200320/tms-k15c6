import { Module } from '@nestjs/common'
import { S106PermissionBasedNavigationMenuController } from './controller'
import { S106PermissionBasedNavigationMenuService } from './service'

@Module({ controllers: [S106PermissionBasedNavigationMenuController], providers: [S106PermissionBasedNavigationMenuService], exports: [S106PermissionBasedNavigationMenuService] })
export class S106PermissionBasedNavigationMenuModule {}
