import { Component, ViewChild } from '@angular/core';
import { ModalFormComponent } from '../modal-form/modal-form/modal-form.component';

@Component({
  selector: 'app-floating-button',
  standalone: false,
  templateUrl: './floating-button.component.html',
  styleUrl: './floating-button.component.scss'
})
export class FloatingButtonComponent {
  @ViewChild('modalForm') modalForm!: ModalFormComponent;

  onClick() {
    this.modalForm.openModal();
  }
}
