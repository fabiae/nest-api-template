import { IsNotEmpty, IsNumber } from "class-validator"

export class UserPermission {
    @IsNotEmpty()
    @IsNumber()
    readonly userId: number

    @IsNotEmpty()
    @IsNumber()
    readonly roleId: number

    @IsNotEmpty()
    @IsNumber()
    readonly permissionId: number
}