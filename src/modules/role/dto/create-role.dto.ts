import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator'

export class CreateRole {
  @IsNotEmpty()
  @IsString()
  @Length(0, 45)
  readonly name: string

  @IsOptional()
  @IsString()
  readonly description: string
}
