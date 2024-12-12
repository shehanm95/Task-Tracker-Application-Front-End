import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SubTaskService } from '../../service/sub-task.service';
import { ISubTask } from '../../../../core/models/isub-task';
import { Route, Router } from '@angular/router';
import { TaskService } from '../../../task/service/task.service';

@Component({
  selector: 'app-edit-sub-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './edit-sub-task.component.html',
  styleUrl: './edit-sub-task.component.css'
})
export class EditSubTaskComponent {
  subTask!: ISubTask
  constructor(
    private subtaskService: SubTaskService,
    private route: Router,
    private taskService: TaskService,
  ) {
    let sub = subtaskService.getSubTaskToEdit();
    if (sub)
      this.subTask = sub;
    else this.taskService.viewCurrentTask();
  }


  editSubtask(form: NgForm) {
    if (form.valid) {
      this.subtaskService.updateSubTask(this.subTask).subscribe();
      this.taskService.viewCurrentTask()
    }
  }


  goBack() {
    this.taskService.viewCurrentTask();
  }
}
