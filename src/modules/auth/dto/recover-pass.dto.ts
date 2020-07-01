import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class RecoverPass {
  @IsNotEmpty()
  @IsNumber()
  readonly id: number

  @IsNotEmpty()
  @IsString()
  readonly password: string
}
