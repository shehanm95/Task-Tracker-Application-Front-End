import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubTaskService } from '../../../subTask/service/sub-task.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { ISubTask } from '../../../../core/models/isub-task';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent implements OnInit {

  subTask: ISubTask;
  constructor(
    private subTaskService: SubTaskService,
    private notificationService: NotificationService,
  ) {
    this.subTask = subTaskService.getSubTaskToEdit()
  }

  ngOnInit(): void {

  }

}
