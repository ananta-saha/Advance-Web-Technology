import { Controller, BadRequestException, Delete, Get, Param, Post, Put, Patch, Body, UploadedFile, UseInterceptors, } from '@nestjs/common';
import { CourseService } from './course.service.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';

import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';

import { extname, join } from 'path';
import { mkdirSync } from 'fs';
import { randomUUID } from 'crypto';

const uploadDirectory = join(process.cwd(), 'src', 'uploads');
mkdirSync(uploadDirectory, { recursive: true });
const allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];
const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'application/pdf',
];

@Controller('course')
export class CourseController {
    constructor(
        private readonly courseService: CourseService,
    ) { }

    @Get()
    getAllCourses() {
        return this.courseService.getAllCourses();
    }

    @Get(':id')
    getCourseById(@Param('id') id: string) {
        return this.courseService.getCourseById(id);
    }

    @Post()
    createCourse(@Body() dto: CreateCourseDto) {
        return this.courseService.createCourse(dto);
    }

    @Put(':id')
    updateCourse(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
        return this.courseService.updateCourse(id, dto);
    }

    @Patch(':id')
    patchCourse(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
        return this.courseService.patchCourse(id, dto);
    }

    @Delete(':id')
    deleteCourse(@Param('id') id: string) {
        return this.courseService.deleteCourse(id);
    }

    @Post(':id/upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: uploadDirectory,
                filename: (_req, file, callback) => {
                    const extension = extname(file.originalname).toLowerCase();
                    const filename = `${randomUUID()}${extension}`;
                    callback(null, filename);
                },
            }),

            fileFilter: (_req, file, callback) => {
                const extension = extname(file.originalname).toLowerCase();
                const extensionAllowed = allowedExtensions.includes(extension);
                const mimeTypeAllowed = allowedMimeTypes.includes(file.mimetype);

                if (!extensionAllowed || !mimeTypeAllowed) {
                    return callback(
                        new BadRequestException(
                            'Only .jpg, .jpeg, .png, and .pdf files are allowed',
                        ),
                        false,
                    );
                }
                callback(null, true);
            },
            limits: {
                fileSize: 2 * 1024 * 1024,
            },
        }),
    )
    uploadCourseMaterial(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
    ) {
        if (!file) {
            throw new BadRequestException('A file is required');
        }
        return this.courseService.uploadCourseMaterial(id, file);
    }
}