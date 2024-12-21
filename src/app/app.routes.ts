import { Routes } from '@angular/router';
import { ViewFullTaskComponent } from './features/task/component/view-full-task/view-full-task.component';
import { EditSubTaskComponent } from './features/subTask/component/edit-sub-task/edit-sub-task.component';
import { AddNewTaskComponent } from './features/task/component/add-new-task/add-new-task.component';
import { EditTaskComponent } from './features/task/component/edit-task/edit-task.component';
import { AddCategoryComponent } from './features/category/component/add-category/add-category.component';
import { EditCategoryListComponent } from './features/category/component/edit-category-list/edit-category-list.component';

export const routes: Routes = [
    { path: "task/view/:id", component: ViewFullTaskComponent, title: "Task Tracker : View" },
    { path: "task/view", component: ViewFullTaskComponent, title: "Task Tracker : View" },
    { path: "task/edit/:id", component: EditTaskComponent, title: "Task Tracker : Edit" },
    { path: "task/add", component: AddNewTaskComponent, title: "Task Tracker : Add" },
    { path: "subTask/edit/:id", component: EditSubTaskComponent, title: "Task Tracker : Edit" },
    { path: "category/add", component: AddCategoryComponent, title: "Task Tracker : Add" },
    { path: "category/edit", component: EditCategoryListComponent, title: "Task Tracker : Edit" },

];

// <!-- <app-view-full-task></app-view-full-task> -->
// <!-- <app-edit-task></app-edit-task> -->
//<!-- <app-add-new-task class="flex-grow-1"></app-add-new-task> -->
//<!-- <app-edit-sub-task class="flex-grow-1"></app-edit-sub-task> -->
//<!-- <app-add-category class="flex-grow-1"> </app-add-category> -->
//<!-- <app-edit-category-list class="flex-grow-1"></app-edit-category-list> -->
