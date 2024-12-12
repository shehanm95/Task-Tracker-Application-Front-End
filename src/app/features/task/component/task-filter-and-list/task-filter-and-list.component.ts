import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { OnWarning } from '../../../common/on-warning';
import { WarningService } from '../../../../core/services/warning.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { NotificationType } from '../../../../core/enums/notification-type';
import { TaskService } from '../../service/task.service';
import { ITask } from '../../../../core/models/itask';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-filter-and-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './task-filter-and-list.component.html',
  styleUrl: './task-filter-and-list.component.css'
})
export class TaskFilterAndListComponent extends OnWarning {

  idToBeDelete: number = 0;
  taskList!: ITask[];
  isReadonly = true;

  constructor(private router: Router,
    public override warningService: WarningService,
    private notificationService: NotificationService, private taskService: TaskService) {
    super(warningService);
    this.loadInitialTasks()
    taskService.setSideBarTaskList(this);
  }

  loadInitialTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (data: ITask[]) => {
        console.log(data)
        this.taskList = data;
        if (this.taskList.length > 0) {
          this.taskService.setCurrentTask(this.taskList[0])
          this.taskService.viewCurrentTask();
        } else {
          console.log("no tasks to show")
          this.router.navigate(['/task/view'])
        }
      },
      error: (error) => {
        console.log(error)
        this.notificationService.showNotification(NotificationType.ERROR, "Error in Fetching Tasks...!")
      }
    })
  }



  viewTask(task: ITask) {
    this.taskService.setCurrentTask(task);
    this.router.navigate(["/task/view/" + task.id])
  }

  loadAddNewTask() {
    this.router.navigate(["/task/add"])
  }

  deleteTask(task: ITask) {
    this.idToBeDelete = task.id;
    this.warningService.showWarning("delete this task : " + task.topic, "Delete", this);
  }

  override onWarningTrue(): void {
    console.log("called")
    this.taskService.deleteTask(this.idToBeDelete).subscribe({
      next: () => {
        this.idToBeDelete = 0;
        this.notificationService.showNotification(NotificationType.SUCCESS, "Task Successfully Deleted....!")
        this.taskService.refreshSideBar()
      },
      error: (error) => {
        this.notificationService.showNotification(NotificationType.SUCCESS, "Something wrong with deleting this task....!")
        console.error("Something wrong with deleting this task : " + error)
      }
    })
  }

  refresh() {
    //refresh the task list according to the filters
    this.loadInitialTasks();
  }

}
