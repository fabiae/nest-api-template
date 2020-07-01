import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from "typeorm"

import { States } from "../../@common/enums/states.enum"
import { UserPermissions } from "./userPermissions.entity"

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ type: 'character varying', nullable: false, unique: true })
    name: string

    @Column({ type: 'enum', enum: States, default: States.ACTIVE })
    state: States

    @CreateDateColumn({ type: 'timestamp', name: 'create_ad' })
    createAd: Date

    @UpdateDateColumn({ type: 'timestamp', name: 'update_ad' })
    updateAd: Date

    @OneToMany(
        type => UserPermissions,
        userPermissions => userPermissions.permission
    )
    userPermissions: UserPermissions[]
}