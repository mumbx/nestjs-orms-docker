import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { UpdateCourseDTO } from './dto/updateCourseDTO';
import { CreateCourseDTO } from './dto/create-course-dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly courseService: CoursesService){}

    @Get()
    findAll(){
        return this.courseService.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
      const course = this.courseService.findOne(id)
      if(!course){
        throw new NotFoundException(`Curso id ${id} não encontrado`)
      }
      return course
    }

    @Post()
    create(@Body() body: CreateCourseDTO){
        return this.courseService.create(body)
    }
    
    @HttpCode(HttpStatus.NO_CONTENT)
    @Put(':id')
    update(@Param('id') id: number, @Body() body: UpdateCourseDTO){
        return this.courseService.update(id, body)
    }   

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    delete(@Param('id') id: number){        
        return this.courseService.delete(id)
    }
}
