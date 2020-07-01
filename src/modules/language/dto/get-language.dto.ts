import { IsString, IsOptional, IsNumberString, IsEnum } from "class-validator"
import { States } from "../../../@common/enums/states.enum"


export class GetLanguage {
    @IsNumberString()
    @IsOptional()
    readonly id?: number

    @IsString()
    @IsOptional()
    readonly name?: string

    @IsOptional()
    @IsEnum(States)
    readonly state?: States
}