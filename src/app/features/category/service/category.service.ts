import { Injectable } from '@angular/core';
import { MainBackEndUrl } from '../../../core/environment/environment.service';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../../../core/models/icategory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly baseUrl = MainBackEndUrl + "/category";

  constructor(private http: HttpClient) { }

  addCategory(ICategory: any): Observable<ICategory> {
    return this.http.post<ICategory>(`${this.baseUrl}/add`, ICategory);
  }

  updateCategory(ICategory: ICategory): Observable<ICategory> {
    return this.http.put<ICategory>(`${this.baseUrl}/update`, ICategory);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  getCategoryById(id: number): Observable<ICategory> {
    return this.http.get<ICategory>(`${this.baseUrl}/get/${id}`);
  }

  getAllCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.baseUrl}/all`);
  }
}