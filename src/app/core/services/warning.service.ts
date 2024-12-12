import { Injectable } from '@angular/core';
import { WarningComponent } from '../../features/common/warning/warning.component';
import { OnWarning, OnWarningSetter } from '../../features/common/on-warning';

@Injectable({
  providedIn: 'root'
})
export class WarningService extends OnWarningSetter {

  waningWindow!: WarningComponent;

  showWarning(warningMessage: string, buttonText: string, warningCaller: OnWarning): boolean {

    this.waningWindow.setTexts(warningMessage, buttonText);
    this.waningWindow.toggleWarning();
    this.setImplementer(warningCaller);
    return false;
  }

  setWarningWindow(warningWindow: WarningComponent) {
    this.waningWindow = warningWindow;
  }


  setWarningImplementer(implementer: OnWarning): void {
    this.implementer = implementer
  }



}

