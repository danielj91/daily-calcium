import { Component, input, output } from '@angular/core';
import { CalciumItem } from '../../shared/calcium-item';

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
      units: this.item().units + 1,
    });
  }

  decrement() {
    if (this.item().units == 0) return;
    this.updateUnits.emit({
      id: this.item().id,
      units: this.item().units - 1,
    });
  }
}

export interface unitsChangedEvent {
  id: number;
  units: number;
}
