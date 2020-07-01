import { IsNotEmpty, IsString } from "class-validator"

export class ChangeLanguage {
    
    @IsNotEmpty()
    @IsString()
    readonly name: string
}