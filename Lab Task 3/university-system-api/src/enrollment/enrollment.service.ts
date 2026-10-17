
import { Injectable } from '@nestjs/common';
import { CourseService } from '../course/course.service.js';

@Injectable()
export class EnrollmentService {
    constructor(
        private readonly courseService: CourseService,
    ) { }

    getAllEnrollments() {
        return {
            message: 'All enrollments fetched',
            data: [],
        };
    }

    getCoursesForEnrollment() {
        return this.courseService.getAllCourses();
    }
}
