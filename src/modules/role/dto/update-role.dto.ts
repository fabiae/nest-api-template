import { IsString, IsOptional, Length } from 'class-validator'

export class UpdateRole {
  @IsOptional()
  @IsString()
  @Length(0, 45)
  readonly name: string

  @IsOptional()
  @IsString()
  @Length(0, 100)
  readonly description: string
}
