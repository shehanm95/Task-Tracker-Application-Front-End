import { Component, EventEmitter, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { OnWarning } from '../../../common/on-warning';
import { WarningService } from '../../../../core/services/warning.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { NotificationType } from '../../../../core/enums/notification-type';
import { TaskService } from '../../service/task.service';
import { ITask } from '../../../../core/models/itask';
import { AsyncPipe, CommonModule, TitleCasePipe } from '@angular/common';
import { IFilterObj } from '../../../../core/models/ifilter-obj';
import { ICategory } from '../../../../core/models/icategory';
import { CategoryService } from '../../../category/service/category.service';
import { FormsModule } from '@angular/forms';
import { UiService } from '../../../../core/services/ui.service';

@Component({
  selector: 'app-task-filter-and-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TitleCasePipe],
  templateUrl: './task-filter-and-list.component.html',
  styleUrl: './task-filter-and-list.component.css'
})
export class TaskFilterAndListComponent extends OnWarning {
  categoryList: ICategory[] = [];
  othersId?: number;


  idToBeDelete: number = 0;
  taskList!: ITask[];
  isReadonly = true;

  filterObj: IFilterObj = {
    text: "",
    state: 0,
    category: 0
  }

  constructor(private router: Router,
    public override warningService: WarningService,
    private notificationService: NotificationService, private taskService: TaskService,
    private categoryService: CategoryService,
    private uiService: UiService

  ) {
    super(warningService);
    this.refresh()
    taskService.setSideBarTaskList(this);
    this.refreshCategories();

  }


  refreshCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (categories: ICategory[]) => {
        this.categoryList = categories;
      }
    })
  }

  setFilterText() {
    this.filterObj.category = 0;
    this.filterObj.category = 0;
    this.fetchOnFilterObj()


  }

  select: string = ''
  setFilterState(stateNum: number, $event: Event) {
    let button = $event.target as HTMLElement;
    if (button.textContent) {
      this.select = button.textContent;
      console.log(this.select)
    }

    this.filterObj.state = stateNum;
    this.fetchOnFilterObj();
  }


  fetchOnFilterObj() {
    this.taskService.fetchOnFilterObj(this.filterObj).subscribe({
      next: (data: ITask[]) => {
        console.log(data)
        this.taskList = data;
        if ((!this.taskService.getCurrentTask() || (this.taskService.getCurrentTask().id == this.idToBeDelete)) && this.taskList.length > 0) {
          this.taskService.setCurrentTask(data[0])
          this.idToBeDelete = 0;
        }
        this.taskService.viewCurrentTask();
      },
      error: (error) => {
        console.log(error)
        this.notificationService.showNotification(NotificationType.ERROR, "Error in Fetching Tasks...!")
      }
    })
  }


  viewTask(task: ITask): boolean {
    this.uiService.toggleSideBar()
    this.taskService.setCurrentTask(task);
    this.router.navigate(["/task/view/" + task.id])
    return false;
  }

  loadAddNewTask() {
    this.uiService.toggleSideBar();
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
        this.notificationService.showNotification(NotificationType.SUCCESS, "Task Successfully Deleted....!")
        this.taskService.refreshSideBar();

      },
      error: (error) => {
        this.notificationService.showNotification(NotificationType.SUCCESS, "Something wrong with deleting this task....!")
        console.error("Something wrong with deleting this task : " + error)
      }
    })
  }

  refresh() {
    //refresh the task list according to the filters
    this.fetchOnFilterObj();
    this.refreshCategories();
  }

}
