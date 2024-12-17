import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { TaskService } from '../../service/task.service';
import { ITask } from '../../../../core/models/itask';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { ISubTask } from '../../../../core/models/isub-task';
import { OnWarning } from '../../../common/on-warning';
import { WarningService } from '../../../../core/services/warning.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { NotificationType } from '../../../../core/enums/notification-type';
import { HttpErrorResponse } from '@angular/common/http';
import { SubTaskService } from '../../../subTask/service/sub-task.service';
import { FormsModule, NgForm } from '@angular/forms';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-view-full-task',
  standalone: true,
  imports: [CommonModule, FormsModule, TitleCasePipe],
  templateUrl: './view-full-task.component.html',
  styleUrl: './view-full-task.component.css'
})
export class ViewFullTaskComponent extends OnWarning implements OnInit {
  taskId!: number;
  task!: ITask;
  subTaskId?: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    public override warningService: WarningService,
    private notificationService: NotificationService,
    private subTaskService: SubTaskService,
    private route: Router
  ) {
    super(warningService);

  }


  ngOnInit(): void {
    // Retrieve the `id` from the route
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.taskId = Number(id);
        if (isNaN(this.taskId)) {
          console.error('Invalid task ID. Expected a number.');
          return;
        }
        this.loadTask();
      }
    });
  }

  loadTask(): void {
    this.taskService.getTaskById(this.taskId).subscribe({
      next: (task: ITask) => {
        this.task = task;
        this.taskService.refreshSideBar()
      },
      error: (error) => {
        console.error('Error fetching task', error);
      }
    });
  }

  deleteSubTask(subTaskId: number, taskName: string) {
    this.subTaskId = subTaskId;
    this.warningService.showWarning("Do you Need to Delete this sub task :\n" + taskName, "delete", this)
  }

  onWarningTrue(): void {
    if (this.subTaskId) {
      this.subTaskService.deleteSubTask(this.subTaskId).subscribe({
        next: (res) => {
          this.loadTask();
          this.subTaskId = undefined;
          this.notificationService.showNotification(NotificationType.SUCCESS, "Sub Task Successfully deleted....!")
        },
        error: (error) => {
          this.notificationService.showNotification(NotificationType.ERROR, "There is a problem with deleting sub task....!")
          console.error(error)
        }

      }

      )
    }
  }

  markFullTaskAsFinished(taskId: number) {
    this.taskService.markAsFinished(taskId).subscribe({
      next: (finishedTask: ITask) => {
        this.task = finishedTask;
        this.notificationService.showNotification(NotificationType.SUCCESS, "This Task marked as Finished...!")
        this.taskService.refreshSideBar()
      },
      error: (error: HttpErrorResponse) => {
        console.error("Error setting task as finished : " + error);
        this.notificationService.showNotification(NotificationType.ERROR, "Error setting task as finished...!")
      }
    });
  }
  toggleSubTaskFinishedState($event: Event, subTask: ISubTask) {
    const cBox = $event.target as HTMLInputElement;
    if (cBox.checked) subTask.isFinished = true;
    else subTask.isFinished = false;

    subTask.taskDto = { id: this.task.id }
    this.subTaskService.updateSubTask(subTask).subscribe({
      next: (res) => {
        if (cBox.checked) this.notificationService.showNotification(NotificationType.SUCCESS, "Sub Task Marked As Finished..!")
        else this.notificationService.showNotification(NotificationType.SUCCESS, "Sub Task Marked As Not Finished..!")
        this.loadTask();
      },
      error: (error: HttpErrorResponse) => {
        console.error("SubTask not correctly updated : " + error)
        this.notificationService.showNotification(NotificationType.ERROR, "SubTask not correctly updated...!");
        cBox.checked = false;
      }
    });
  }


  addSubTask(form: NgForm) {
    if (form.valid) {
      let newF = { ...form.value }
      newF = {
        ...newF,
        taskDto: { id: this.task.id }
      }
      console.log(newF)
      this.subTaskService.addSubTask(newF).subscribe({
        next: (val) => {
          console.log(val)
          this.loadTask()
          form.reset()
          this.notificationService.showNotification(NotificationType.SUCCESS, "Added a SubTask successfully...!")
        }
        , error: (error) => {
          this.notificationService.showNotification(NotificationType.ERROR, "There is something wrong in adding new sub task...!")
          console.error("error in adding sub task : " + error);
        }
      });
    }
    else this.notificationService.showNotification(NotificationType.ERROR, "Please Fill The SubTask Form Correctly...!")
  }

  editSubTask(subTask: ISubTask) {
    subTask.taskDto = { id: this.task.id }
    this.subTaskService.setSubTaskToEdit(subTask);
    this.route.navigate(['/subTask/edit/' + subTask.id])
  }

  goToAddTask() {
    this.route.navigate(['/task/add'])
  }

  goToEditTask() {
    this.route.navigate(['/task/edit/' + this.taskService.getCurrentTask().id])
  }
}

