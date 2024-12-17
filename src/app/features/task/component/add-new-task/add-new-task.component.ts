import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../service/task.service';
import { ITask } from '../../../../core/models/itask';
import { NotificationService } from '../../../../core/services/notification.service';
import { NotificationType } from '../../../../core/enums/notification-type';
import { CategoryService } from '../../../category/service/category.service';
import { ICategory } from '../../../../core/models/icategory';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../../../core/services/local-storage.service';
import { IDraftTask } from '../../../../core/models/dataftTask';

@Component({
  selector: 'app-add-new-task',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-new-task.component.html',
  styleUrl: './add-new-task.component.css'
})
export class AddNewTaskComponent {

  categoryList!: ICategory[];
  taskDraft!: IDraftTask; // if we added a category white adding a task , that task will be saved as a draft in this,
  ifCategoryIdZero: boolean = false;


  constructor(private router: Router,
    private taskService: TaskService,
    private notificationService: NotificationService,
    private categoryService: CategoryService,
    private localStorageService: LocalStorageService,
  ) {
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

      this.taskService.addTask(f).subscribe({
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
          this.notificationService.showNotification(NotificationType.ERROR, "Error Adding Task...!")
          console.error("Error adding task : " + error)
        }
      })

    } else {
      this.notificationService.showNotification(NotificationType.ERROR, "Please fill the form correctly...!")
    }
  }
}
