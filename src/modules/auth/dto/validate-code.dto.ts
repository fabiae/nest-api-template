import { IsNotEmpty, IsNumber } from "class-validator"

export class ValidateCode {
   
    @IsNotEmpty()
    @IsNumber()
    readonly id: number
    
    @IsNotEmpty()
    @IsNumber()
    readonly code: number
}