import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm"

import { States } from "../../@common/enums/states.enum"
import { User } from "./user.entity"

@Entity('languages')
export class Language {

    @PrimaryGeneratedColumn({ type: 'int' })
    id: number

    @Column({ type: 'character varying', nullable: false, length: 20 })
    name: string

    @Column({ type: 'character varying', nullable: false, length: 6 })
    key: string

    @Column({ type: 'enum', enum: States, default: States.ACTIVE })
    state: States

    @CreateDateColumn({ type: 'timestamp', name: 'create_ad' })
    createAd: Date

    @UpdateDateColumn({ type: 'timestamp', name: 'update_ad' })
    updateAd: Date

    @OneToMany(
        type => User,
        user => user.language,
    )
    users: User[]
}