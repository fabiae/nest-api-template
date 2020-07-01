import { IsNotEmpty, IsString } from "class-validator"

export class CreatePermission {
    @IsNotEmpty()
    @IsString()
    readonly name: string
}