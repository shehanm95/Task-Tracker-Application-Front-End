import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../../../core/services/notification.service';
import { CategoryService } from '../../service/category.service';
import { NotificationType } from '../../../../core/enums/notification-type';
import { ICategory } from '../../../../core/models/icategory';
import { LocalStorageService } from '../../../../core/services/local-storage.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private categoryService: CategoryService,
    private localstorageService: LocalStorageService
  ) { }
  gotoFullTask() {
    this.router.navigate(['/task/add'])
  }


  addCategory(form: NgForm) {
    if (form.valid) {
      this.categoryService.addCategory(form.value).subscribe({
        next: (category: ICategory) => {
          this.notificationService.showNotification(NotificationType.SUCCESS, "You successfully added a notification....!")
          this.localstorageService.setCategoryToDraftedTask(category)
          this.router.navigate(['/task/add'])
        }
      })
    } else {
      this.notificationService.showNotification(NotificationType.ERROR, "Please fill the form correctly...!")
    }
  }

}
