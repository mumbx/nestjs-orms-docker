import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity';
import { CreateCourseDTO } from './dto/create-course-dto';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,

        @InjectRepository(Tag)
        private readonly tagRepository: Repository<Tag>
    ) { }

    async findAll() {
        return this.courseRepository.find({ relations: ['tags'] })
    }

    async findOne(id: number) {
        const course = await this.courseRepository.findOne({ where: { id }, relations: ['tags'] })
        if (!course) {
            throw new NotFoundException(`cannot found course white id ${id}`)
        }
        return course
    }

    async create(createCourseDTO: CreateCourseDTO) {
        const tags = await Promise.all(
            createCourseDTO.tags.map(name => this.preloadTagByName(name))
        )

        const course = this.courseRepository.create({ ...createCourseDTO, tags })
        return this.courseRepository.save(course)
    }

    async update(id: number, updateCourseDTO: any) {
        const tags = updateCourseDTO.tags && (await Promise.all(
            updateCourseDTO.tags.map(name => this.preloadTagByName(name))
        ))

        const course = await this.courseRepository.preload({ id, tags, ...updateCourseDTO })
        if (!course) {
            throw new NotFoundException(`cannot found course white id ${id}`)
        }
        return this.courseRepository.save(course)
    }

    async delete(id: number) {
        const course = await this.courseRepository.findOne({ where: { id } })
        if (!course) {
            throw new NotFoundException(`cannot found course white id ${id}`)
        }
        return this.courseRepository.remove(course)
    }

    private async preloadTagByName(name: string): Promise<Tag> {
        const tag = await this.tagRepository.findOne({ where: { name } })
        if (tag) {
            return tag
        }
        return this.tagRepository.create({ name })
    }
}
