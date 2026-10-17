
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CourseService } from '../course/course.service.js';
import { NotificationService } from '../notification/notification.service.js';

@Injectable()
export class EnrollmentService {
    constructor(
        private readonly courseService: CourseService,
        @Inject(forwardRef(() => NotificationService))
        private readonly notificationService: any,
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

    createEnrollment() {
        const notification = this.notificationService.sendNotification();

        return {
            message: 'Enrollment created',
            notification,
        };
    }
}
