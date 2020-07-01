import { IsNotEmpty, IsNumber } from "class-validator"

export class UserRole {
    @IsNotEmpty()
    @IsNumber()
    readonly userId: number

    @IsNotEmpty()
    @IsNumber()
    readonly roleId: number
}