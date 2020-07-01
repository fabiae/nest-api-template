import { 
    Entity, 
    PrimaryGeneratedColumn, 
    CreateDateColumn, 
    UpdateDateColumn, 
    Column, 
    ManyToOne,
    JoinColumn
} from "typeorm"

import { States } from "../../@common/enums/states.enum"
import { Permission } from "./permission.entity"
import { UserRoles } from "./userRoles.entity"

@Entity('user_permissions')
export class UserPermissions {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ type: 'enum', enum: States, default: States.ACTIVE })
    state: States

    @CreateDateColumn({ type: 'timestamp', name: 'create_ad' })
    createAd: Date

    @UpdateDateColumn({ type: 'timestamp', name: 'update_ad' })
    updateAd: Date

    @ManyToOne(
        type => UserRoles,
        userRoles => userRoles.userPermissions
    )
    @JoinColumn({ name: 'fk_user_role' })
    userRoles: UserRoles

    @ManyToOne(
        type => Permission,
        permission => permission.userPermissions
    )
    @JoinColumn({ name: 'fk_permission' })
    permission: Permission
}