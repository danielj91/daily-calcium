import { Component, output } from '@angular/core';

@Component({
  selector: 'app-edit-item-modal',
  imports: [],
  templateUrl: './edit-item-modal.html',
})
export class EditItemModal {
  public cancel = output<void>();

  protected hideModal() {
    this.cancel.emit();
  }
}
