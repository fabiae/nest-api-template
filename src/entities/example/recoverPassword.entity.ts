import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm"

@Entity('recover-password')
export class RecoverPassword {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column({ type: 'int', nullable: false })
    userId: number

    @Column({ type: 'int', nullable: false })
    code: number

    @Column({ type: 'enum', enum: ['ACTIVE', 'EXPIRED', 'SUCCESS'], default: 'ACTIVE' })
    state: string

    @CreateDateColumn({ type: 'timestamp', name: 'create_ad' })
    createAd: Date
}