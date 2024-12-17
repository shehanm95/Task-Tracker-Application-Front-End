import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from '../../../../core/models/icategory';
import { IFilterObj } from '../../../../core/models/ifilter-obj';
import { ITask } from '../../../../core/models/itask';
import { NotificationService } from '../../../../core/services/notification.service';
import { WarningService } from '../../../../core/services/warning.service';
import { TaskService } from '../../../task/service/task.service';
import { CategoryService } from '../../service/category.service';
import { OnWarning } from '../../../common/on-warning';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NotificationType } from '../../../../core/enums/notification-type';
import { LocalStorageService } from '../../../../core/services/local-storage.service';

@Component({
  selector: 'app-edit-category-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-category-list.component.html',
  styleUrl: './edit-category-list.component.css'
})
export class EditCategoryListComponent extends OnWarning {

  categoryList: ICategory[] = [];
  categoryIdToBeDeleted!: number;


  idToBeDelete: number = 0;
  taskList!: ITask[];
  isReadonly = true;

  filterObj: IFilterObj = {
    text: "",
    state: 0,
    category: 0
  }
  categoryToEdit!: ICategory;

  constructor(private router: Router,
    private localStorageService: LocalStorageService,
    public override warningService: WarningService,
    private notificationService: NotificationService, private taskService: TaskService,
    private categoryService: CategoryService) {
    super(warningService);
    taskService.refreshCategories();
    this.loadCategories();
  }
  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (res: ICategory[]) => {
        this.categoryList = res;
      },
      error: (error) => {
        this.notificationService.showNotification(NotificationType.ERROR, "Error loading categories..!")
        console.error("Error loading categories : " + error)
      }
    })
  }

  askToDelete(category: ICategory) {
    this.categoryIdToBeDeleted = category.id;
    this.warningService.showWarning("Do you need to delete this Category...? " + category.name, "Delete", this);
  }
  override onWarningTrue(): void {
    this.categoryService.deleteCategory(this.categoryIdToBeDeleted).subscribe({
      next: res => {
        this.notificationService.showNotification(NotificationType.SUCCESS, "You successfully deleted this category..!")
        this.taskService.refreshCategories();
      },
      error: res => {
        this.notificationService.showNotification(NotificationType.ERROR, "Error deleting category..!")
        console.error("Error deleting category : " + res)
      }
    })
    this.categoryIdToBeDeleted = 0;
  }

  editCategory(category: ICategory) {
    this.categoryToEdit = category;
  }


  submitEdit(form: NgForm) {
    if (form.valid) {
      this.categoryService.updateCategory(this.categoryToEdit).subscribe({
        next: res => {
          this.notificationService.showNotification(NotificationType.SUCCESS, "You successfully edited this category..!")
          this.taskService.refreshCategories();
          this.loadCategories();
        },
        error: res => {
          this.notificationService.showNotification(NotificationType.ERROR, "Error editing category..!")
          console.error("Error deleting category : " + res)
        }
      });
    } else {
      this.notificationService.showNotification(NotificationType.ERROR, "You must Provide a valid category name")
    }
  }

  goBack() {
    let task = this.localStorageService.getDraftTask();
    task.categoryId = 0;
    this.localStorageService.setDraftATask(task);
    this.router.navigate(['/category/add']);
  }

}
