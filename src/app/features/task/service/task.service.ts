import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MainBackEndUrl } from '../../../core/environment/environment.service';
import { ITask } from '../../../core/models/itask';
import { TaskFilterAndListComponent } from '../component/task-filter-and-list/task-filter-and-list.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _currentTask!: ITask;


  refreshSideBar() {
    this.sideBarTaskList.refresh()
  }

  url: string = MainBackEndUrl + "/task"
  sideBarTaskList!: TaskFilterAndListComponent;

  constructor(private http: HttpClient,
    private router: Router
  ) { }

  setSideBarTaskList(sideBarTaskListFilter: TaskFilterAndListComponent) {
    this.sideBarTaskList = sideBarTaskListFilter;
  }

  // Get all tasks
  getAllTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(`${this.url}/all`);
  }

  // Add a new task
  addTask(ITask: any): Observable<ITask> {
    return this.http.post<ITask>(`${this.url}/add`, ITask);
  }

  // Update an existing task
  updateTask(ITask: ITask): Observable<ITask> {
    return this.http.put<ITask>(`${this.url}/update`, ITask);
  }

  // Delete a task by ID
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/delete/${id}`);
  }

  // Get a task by ID
  getTaskById(id: number): Observable<ITask> {
    return this.http.get<ITask>(`${this.url}/get/${id}`);
  }

  // Mark task as finished
  markAsFinished(id: number): Observable<ITask> {
    return this.http.get<ITask>(`${this.url}/finish/${id}`);
  }
  getCurrentTask(): ITask {
    return this._currentTask;
  }

  setCurrentTask(currentTask: ITask) {
    this._currentTask = currentTask;
  }

  viewCurrentTask() {
    if (this._currentTask) {
      this.router.navigate(["/task/view/" + this._currentTask.id]);
    }

  }

}
