import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Tag } from "./tags.entity"

@Entity('courses')
export class Course {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    description: string

    @JoinTable()
    @ManyToMany(() => Tag, Tag => Tag.courses, {
        cascade: true
    })
    tags: Tag[]
}