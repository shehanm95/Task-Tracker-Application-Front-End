import { Injectable } from '@angular/core';
import { ICategory } from '../models/icategory';
import { IDraftTask } from '../models/dataftTask';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setDraftATask(draftTask: IDraftTask) {
    localStorage.setItem("draftTask", JSON.stringify(draftTask));
  }

  getDraftTask(): IDraftTask {
    let tempDraft: IDraftTask = {
      topic: "",
      categoryId: -2,
      description: "",
      startingDate: "",
      dueDate: ""
    }
    try {
      let task = localStorage.getItem("draftTask");
      return task ? JSON.parse(task) : tempDraft;
    } catch (error) {
      console.error("Error parsing draftTask from localStorage:", error);
      return tempDraft;
    }
  }



  setCategoryToDraftedTask(category: ICategory) {
    let draft = this.getDraftTask()
    draft.categoryId = category.id;
    this.setDraftATask(draft);
  }

  removeDraftTask() {
    localStorage.removeItem("draftTask")
  }
}
