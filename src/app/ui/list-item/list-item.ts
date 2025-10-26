import { Component, input } from '@angular/core';
import { CalciumItem } from '../../shared/calcium-item';

@Component({
  selector: 'app-list-item',
  imports: [],
  templateUrl: './list-item.html',
})
export class ListItem {
  item = input.required<CalciumItem>();

  increment() {
    this.item().units += 1;
  }

  decrement() {
    if (this.item().units <= 1) return;
    this.item().units -= 1;
  }
}
