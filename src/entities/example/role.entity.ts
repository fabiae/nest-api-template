import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    OneToMany
} from "typeorm"

import { States } from "../../@common/enums/states.enum"
import { UserRoles } from "./userRoles.entity"

@Entity('roles')
export class Role {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ type: 'character varying', nullable: false, length: 45 })
    name: string

    @Column({ type: 'text', nullable: true })
    description: string

    @Column({ type: 'enum', enum: States, default: States.ACTIVE })
    state: States

    @CreateDateColumn({ type: 'timestamp', name: 'create_ad' })
    createAd: Date

    @UpdateDateColumn({ type: 'timestamp', name: 'update_ad' })
    updateAd: Date

    @OneToMany(
        type => UserRoles,
        userRoles => userRoles.role,
    )
    userRoles: UserRoles[]
}