import { genSaltSync, hashSync, compareSync } from 'bcryptjs'
import { Injectable } from '@nestjs/common'

@Injectable()
export class BcryptService {
    encryption(text: string): string {
        const salt = genSaltSync(10)
        return hashSync(text, salt)
    }

    match(text: string, hash: string): boolean {
        return compareSync(text, hash)
    }
}