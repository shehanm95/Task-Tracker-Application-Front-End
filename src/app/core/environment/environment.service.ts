import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor() { }
}

export const MainBackEndUrl = "http://localhost:8080"
