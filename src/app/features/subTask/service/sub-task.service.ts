import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISubTask } from '../../../core/models/isub-task';
import { Observable } from 'rxjs';
import { MainBackEndUrl } from '../../../core/environment/environment.service';
import { ITask } from '../../../core/models/itask';

@Injectable({
  providedIn: 'root'
})
export class SubTaskService {

  url = MainBackEndUrl + "/subTask"
  private subTaskToEdit!: ISubTask;
  constructor(private http: HttpClient) { }



  // Add a new sub-task
  addSubTask(ISubTask: ISubTask): Observable<ISubTask> {
    return this.http.post<ISubTask>(`${this.url}/add`, ISubTask);
  }

  // Get all sub-tasks
  getAllSubTasks(): Observable<ISubTask[]> {
    return this.http.get<ISubTask[]>(`${this.url}/all`);
  }

  // Update a sub-task
  updateSubTask(ISubTask: ISubTask): Observable<void> {
    return this.http.put<void>(`${this.url}/update`, ISubTask);
  }

  // Delete a sub-task
  deleteSubTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/delete/${id}`);
  }
  getSubTaskToEdit(): ISubTask {
    return this.subTaskToEdit
  }

  setSubTaskToEdit(subTask: ISubTask) {
    this.subTaskToEdit = subTask;
  }
}