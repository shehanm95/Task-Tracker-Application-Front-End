import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NotificationType } from '../../../core/enums/notification-type';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  show: boolean = false;
  typeError: boolean = false;
  notificationMessage!: string;

  constructor(private notificationService: NotificationService) {
    notificationService.setNotificationComponent(this);
  }


  showNotification(notificationType: NotificationType, notificationMessage: string) {
    if (notificationType == NotificationType.ERROR) this.typeError = true;
    else this.typeError = false;
    this.notificationMessage = notificationMessage;
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 2000);
  }

}
