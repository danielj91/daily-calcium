import {
  Component,
  computed,
  signal,
  type WritableSignal,
} from '@angular/core';
import type { CalciumItem } from './shared/calcium-item';
import { EditItemModal } from './ui/edit-item-modal/edit-item-modal';
import { EmptyListItem } from './ui/empty-list-item/empty-list-item';
import { ListItem, type unitsChangedEvent } from './ui/list-item/list-item';
import { ResultCard } from './ui/result-card/result-card';

@Component({
  selector: 'app-root',
  imports: [ListItem, EmptyListItem, ResultCard, EditItemModal],
  templateUrl: './app.html',
})
export class App {
  showEditModal = false;

  list_of_items: WritableSignal<CalciumItem[]> = signal([
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
  ]);

  calcium_amount = computed(() => {
    return this.list_of_items().reduce((total, item) => {
      return total + item.calcium_per_unit * item.units;
    }, 0);
  });

  updateUnits(newValue: unitsChangedEvent) {
    this.list_of_items.update((items) =>
      items.map((item) =>
        item.id === newValue.id ? { ...item, units: newValue.units } : item,
      ),
    );
  }

  showModal() {
    this.showEditModal = true;
  }

  hideModal() {
    this.showEditModal = false;
  }
}
