import { Component, input, output } from '@angular/core';
import type { CalciumItem } from '../../shared/calcium-item';

@Component({
  selector: 'app-list-item',
  imports: [],
  templateUrl: './list-item.html',
})
export class ListItem {
  item = input.required<CalciumItem>();
  updateUnits = output<unitsChangedEvent>();

  increment() {
    this.updateUnits.emit({
      id: this.item().id,
      servings: this.item().servings + 1,
    });
  }

  decrement() {
    if (this.item().servings === 0) return;
    this.updateUnits.emit({
      id: this.item().id,
      servings: this.item().servings - 1,
    });
  }
}

export interface unitsChangedEvent {
  id: string;
  servings: number;
}
