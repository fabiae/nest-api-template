import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    OneToOne, 
    ManyToOne,
    JoinColumn
} from "typeorm"

import { User } from "./user.entity"
import { Language } from "./language.entity"
import { Photo } from "./photo.entity"
import { Genders } from "../../@common/enums/genders.enum"

@Entity('profile')
export class Profile {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ type: 'character varying', length: 40, name: 'first_name', nullable: true })
    firstName: string

    @Column({ type: 'character varying', length: 40, name: 'last_name', nullable: true })
    lastName: string

    @Column({ type: 'int', nullable: true })
    age: number

    @Column({ type: 'enum', enum: Genders, nullable: true })
    gender: Genders

    @Column({ type: 'bigint', nullable: true })
    phone: number

    @CreateDateColumn({ type: 'timestamp', name: 'create_ad' })
    createAd: Date

    @UpdateDateColumn({ type: 'timestamp', name: 'update_ad' })
    updateAd: Date

    @OneToOne(
        type => User,
        user => user.profile,
    )
    user: User

    @ManyToOne(
        type => Language,
        language => language.profiles,
    )
    @JoinColumn({ name: 'fk_language' })
    language: Language

    @OneToOne(
        type => Photo,
        photo => photo.profile
    )
    @JoinColumn({ name: 'fk_photo' })
    photo: Photo
}