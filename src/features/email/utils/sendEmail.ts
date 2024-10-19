import { emailLoggingMiddleware } from '@/middleware/emailLoggingMiddleware';

import nodemailerService from '../server/nodemailerService';
import { EmailService } from '../types/EmailService';

const emailService: EmailService = emailLoggingMiddleware(nodemailerService);

export const sendEmail = emailService.sendEmail;
