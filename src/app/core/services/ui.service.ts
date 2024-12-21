import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  constructor() {

  }

  toggleSideBar() {
    const sideBar = document.getElementById("sideBar") as HTMLElement
    sideBar.classList.remove("hideSideBar");
    sideBar.classList.toggle("showSideBar");
  }

  closeSideBar() {
    const sideBar = document.getElementById("sideBar") as HTMLElement
    if (sideBar.classList.contains("showSideBar")) {
      console.log("it contains")
      sideBar.classList.add("hideSideBar");
      sideBar.classList.remove("showSideBar")
    }
  }
}
