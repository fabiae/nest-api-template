import { IsString, IsOptional } from 'class-validator'

export class UpdateLanguage {
  @IsOptional()
  @IsString()
  readonly name: string

  @IsOptional()
  @IsString()
  readonly key: string
}
