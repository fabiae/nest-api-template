import { IsString, IsOptional, IsEnum, IsNumberString } from "class-validator"
import { States } from '../../../@common/enums/states.enum'

export class GetRole {
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