import { Component } from '@angular/core';
import { ListItem } from './ui/list-item/list-item';
import { CalciumItem } from './shared/calcium-item';
import { EmptyListItem } from './ui/empty-list-item/empty-list-item';
import { ResultCard } from './ui/result-card/result-card';

@Component({
  selector: 'app-root',
  imports: [ListItem, EmptyListItem, ResultCard],
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
