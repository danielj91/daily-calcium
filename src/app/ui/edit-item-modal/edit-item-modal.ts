import { Component, output, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import type { CreateCalciumItemDto } from '../../shared/calcium-item';

@Component({
  selector: 'app-edit-item-modal',
  imports: [FormField],
  templateUrl: './edit-item-modal.html',
})
export class EditItemModal {
  public readonly cancel = output<void>();
  public readonly save = output<CreateCalciumItemDto>();

  private calciumItemFormModel = signal<CreateCalciumItemDto>({
    name: '',
    calcium_per_unit: 0,
    units: 0,
    unit_type: 'g',
  });
  protected calciumItemForm = form(this.calciumItemFormModel);

  protected hideModal() {
    this.cancel.emit();
  }

  protected saveItem() {
    this.save.emit(this.calciumItemFormModel());
  }
}
