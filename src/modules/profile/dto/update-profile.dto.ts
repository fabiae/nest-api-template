import { IsString, IsNumber, IsNotEmpty, IsOptional, IsEnum } from 'class-validator'
import { Genders } from '../../../@common/enums/genders.enum'

export class UpdateProfile {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string

  @IsString()
  @IsOptional()
  readonly lastName: string

  @IsNumber()
  @IsOptional()
  readonly age: string

  @IsNotEmpty()
  @IsEnum(Genders)
  readonly gender: Genders

  @IsString()
  @IsNotEmpty()
  readonly phone: string
}
