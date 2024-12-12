import { Injectable } from '@angular/core';
import { NotificationComponent } from '../../features/common/notification/notification.component';
import { NotificationType } from '../enums/notification-type';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationComponent!: NotificationComponent;
  constructor() { }

  setNotificationComponent(notificationComp: NotificationComponent) {
    this.notificationComponent = notificationComp;
  }

  showNotification(notificationType: NotificationType, notificationMessage: string) {
    this.notificationComponent.showNotification(notificationType, notificationMessage);
  }




}
