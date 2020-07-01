import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    OneToOne 
} from "typeorm"

import { Profile } from "./profile.entity"

@Entity('photos')
export class Photo {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ type: 'character varying', nullable: false })
    url: string

    @Column({ type: 'text', nullable: true })
    description: string

    @Column({ type: 'enum', enum: ['profile', 'cover'], name: 'type_photo', default: 'profile' })
    typePhoto: string

    @OneToOne(
        type => Profile,
        profile => profile.photo
    )
    profile: Profile
}