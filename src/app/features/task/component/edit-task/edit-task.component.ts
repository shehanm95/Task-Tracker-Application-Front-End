import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubTaskService } from '../../../subTask/service/sub-task.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { ISubTask } from '../../../../core/models/isub-task';
import { TaskService } from '../../service/task.service';
import { ITask } from '../../../../core/models/itask';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NotificationType } from '../../../../core/enums/notification-type';
import { IDraftTask } from '../../../../core/models/dataftTask';
import { ICategory } from '../../../../core/models/icategory';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { CategoryService } from '../../../category/service/category.service';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {

  currentTask: ITask;
  categoryList!: ICategory[];
  taskDraft!: IDraftTask; // if we added a category white adding a task , that task will be saved as a draft in this,
  ifCategoryIdZero: boolean = false;


  constructor(
    private router: Router,
    private taskService: TaskService,
    private notificationService: NotificationService,
    private categoryService: CategoryService,
    private localStorageService: LocalStorageService,
  ) {
    this.currentTask = taskService.getCurrentTask()
    categoryService.getAllCategories().subscribe({
      next: (allCategories: ICategory[]) => {
        this.categoryList = allCategories;
      }
    })
    this.taskDraft = localStorageService.getDraftTask();
  }

  toggleToAddCategory($event: Event) {
    const categorySelector = $event.target as HTMLInputElement;
    if (this.taskDraft.categoryId == -1) {
      this.localStorageService.setDraftATask(this.taskDraft)
      this.router.navigate(["/category/add"]);
    }
    else if (this.taskDraft.categoryId == 0) {

      categorySelector.classList.add('ng-invalid')
      this.ifCategoryIdZero = true
    } else {
      this.ifCategoryIdZero = false;
      categorySelector.classList.remove('ng-invalid')
    }
  }


  addTask(form: NgForm) {
    if (form.valid) {

      let category = this.categoryList.find(task => task.id = this.taskDraft.categoryId)
      let f = { ...form.value };
      f = {
        ...f,
        category
      }

      this.taskService.updateTask(this.currentTask).subscribe({
        next: (task: ITask) => {
          //this.taskService.sideBarTaskList.taskList.push(task);
          this.taskService.setCurrentTask(task);
          this.taskService.sideBarTaskList.refresh()
          this.taskService.sideBarTaskList.taskList.push(task);
          this.localStorageService.removeDraftTask()
          this.notificationService.showNotification(NotificationType.SUCCESS, "Task added successfully...!")
          form.reset()
        },
        error: (error) => {
          this.notificationService.showNotification(NotificationType.SUCCESS, "Error Adding Task...!")
          console.error("Error adding task : " + error)
        }
      })

    }
  }
}
