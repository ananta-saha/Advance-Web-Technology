
import { Controller, Get } from '@nestjs/common';
import { NotificationService } from './notification.service.js';

@Controller('notification')
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService,
    ) { }

    @Get('enrollment-info')
    getEnrollmentInfo() {
        return this.notificationService.getEnrollmentInfo();
    }
}
