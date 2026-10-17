
import { Controller, Get } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service.js';

@Controller('enrollment')
export class EnrollmentController {
    constructor(
        private readonly enrollmentService: EnrollmentService,
    ) { }

    @Get('courses')
    getCoursesForEnrollment() {
        return this.enrollmentService.getCoursesForEnrollment();
    }

    @Get()
    getAllEnrollments() {
        return this.enrollmentService.getAllEnrollments();
    }

    @Get('create')
    createEnrollment() {
        return this.enrollmentService.createEnrollment();
    }

}
