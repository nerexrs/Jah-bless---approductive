import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-form',
  standalone: false,
  templateUrl: './modal-form.component.html',
  styleUrl: './modal-form.component.scss'
})
export class ModalFormComponent {
  @Output() close = new EventEmitter<void>();

  isVisible = false;
  inputValue = '';

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }

  onSubmit() {
    if (this.inputValue.trim()) {
      alert(`Valor enviado: ${this.inputValue}`);
      this.closeModal();
    }
  }
}
