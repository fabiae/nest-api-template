import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    UpdateDateColumn, 
    CreateDateColumn, 
    ManyToOne, 
    JoinColumn, 
    OneToMany
} from "typeorm"

import { States } from "../../@common/enums/states.enum"
import { User } from "./user.entity"
import { Role } from "./role.entity"
import { UserPermissions } from "./userPermissions.entity"

@Entity('user_roles')
export class UserRoles {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ type: 'enum', enum: States, default: States.ACTIVE })
    state: States

    @CreateDateColumn({ type: 'timestamp', name: 'create_ad' })
    createAd: Date

    @UpdateDateColumn({ type: 'timestamp', name: 'update_ad' })
    updateAd: Date

    @ManyToOne(
        type => User,
        user => user.userRoles
    )
    @JoinColumn({ name: 'fk_user' })
    user: User

    @ManyToOne(
        type => Role,
        role => role.userRoles,
        { eager: true }
    )
    @JoinColumn({ name: 'fk_role' })
    role: Role

    @OneToMany(
        type => UserPermissions,
        userPermissions => userPermissions.userRoles
    )
    userPermissions: UserPermissions[]
}