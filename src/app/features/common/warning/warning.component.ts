import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { WarningService } from '../../../core/services/warning.service';

@Component({
  selector: 'app-warning',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './warning.component.html',
  styleUrl: './warning.component.css'
})
export class WarningComponent {
  warningMessage: string = "warningMessage";
  buttonText: string = "delete";

  showWarning: boolean = false;

  constructor(private warningService: WarningService) {
    warningService.setWarningWindow(this);
  }

  toggleWarning() {
    this.showWarning = !this.showWarning;
  }

  setTexts(warningMessage: string, buttonText: string) {
    this.buttonText = buttonText;
    this.warningMessage = warningMessage;
  }

  onPositive() {
    this.warningService.notifyToImplementer();
    this.toggleWarning();
  }

}
