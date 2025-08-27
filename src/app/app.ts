import { Component } from '@angular/core';
import { ListItem } from './ui/list-item/list-item';
import { CalciumItem } from './shared/calcium-item';

@Component({
  selector: 'app-root',
  imports: [ListItem],
  templateUrl: './app.html',
})
export class App {
  list_of_items: CalciumItem[] = [
    {
      id: 1,
      name: 'milk',
      calcium_per_unit: 1,
      units: 1,
    },
    {
      id: 2,
      name: 'milk',
      calcium_per_unit: 1,
      units: 1,
    },
  ];
}
