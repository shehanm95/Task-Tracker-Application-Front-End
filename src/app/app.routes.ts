import { Routes } from '@angular/router';
import { ViewFullTaskComponent } from './features/task/component/view-full-task/view-full-task.component';
import { EditSubTaskComponent } from './features/subTask/component/edit-sub-task/edit-sub-task.component';
import { AddNewTaskComponent } from './features/task/component/add-new-task/add-new-task.component';
import { EditTaskComponent } from './features/task/component/edit-task/edit-task.component';
import { AddCategoryComponent } from './features/category/component/add-category/add-category.component';
import { EditCategoryListComponent } from './features/category/component/edit-category-list/edit-category-list.component';

export const routes: Routes = [
    { path: "task/view/:id", component: ViewFullTaskComponent },
    { path: "task/view", component: ViewFullTaskComponent },
    { path: "task/edit/:id", component: EditTaskComponent },
    { path: "task/add", component: AddNewTaskComponent },
    { path: "subTask/edit/:id", component: EditSubTaskComponent },
    { path: "category/add", component: AddCategoryComponent },
    { path: "category/edit", component: EditCategoryListComponent },

];

// <!-- <app-view-full-task></app-view-full-task> -->
// <!-- <app-edit-task></app-edit-task> -->
//<!-- <app-add-new-task class="flex-grow-1"></app-add-new-task> -->
//<!-- <app-edit-sub-task class="flex-grow-1"></app-edit-sub-task> -->
//<!-- <app-add-category class="flex-grow-1"> </app-add-category> -->
//<!-- <app-edit-category-list class="flex-grow-1"></app-edit-category-list> -->
