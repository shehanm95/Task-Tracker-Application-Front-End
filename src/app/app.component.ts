import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ViewFullTaskComponent } from "./features/task/component/view-full-task/view-full-task.component";
import { AddNewTaskComponent } from "./features/task/component/add-new-task/add-new-task.component";
import { EditTaskComponent } from "./features/task/component/edit-task/edit-task.component";
import { EditSubTaskComponent } from "./features/subTask/component/edit-sub-task/edit-sub-task.component";
import { AddCategoryComponent } from "./features/category/component/add-category/add-category.component";
import { EditCategoryListComponent } from "./features/category/component/edit-category-list/edit-category-list.component";
import { TaskFilterAndListComponent } from "./features/task/component/task-filter-and-list/task-filter-and-list.component";
import { WarningComponent } from "./features/common/warning/warning.component";
import { NotificationComponent } from "./features/common/notification/notification.component";
import { UiService } from './core/services/ui.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TaskFilterAndListComponent, WarningComponent, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'taskTrackerFrontEnd';
  constructor(private uiService: UiService) { }

  showSideBar() {
    this.uiService.toggleSideBar()
  }
}
