import { IsNotEmpty, IsString } from 'class-validator'

export class S102SessionLogoutDto {
  @IsString()
  @IsNotEmpty()
  refreshToken!: string
}
