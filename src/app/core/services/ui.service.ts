import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor() {

  }

  toggleSideBar() {
    const sideBar = document.getElementById("sideBar") as HTMLElement
    sideBar.classList.toggle("showSideBar");
  }
}
