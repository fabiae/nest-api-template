import { IsString, IsNotEmpty } from 'class-validator'

export class SignIn {
    @IsNotEmpty()
    @IsString()
    readonly username: string

    @IsNotEmpty()
    @IsString()
    readonly password: string
}
