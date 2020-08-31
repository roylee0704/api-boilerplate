import { AdminUser } from '../../admin-user/admin-user.entity';
import { AbstractEvent } from './abstract.event';

/**
 * @description
 * This event is fired when a Admin user requests a password reset email.
 */
export class AdminPasswordResetEvent extends AbstractEvent {
    constructor(public user: AdminUser, public passwordResetToken: string) {
        super();
    }
}
