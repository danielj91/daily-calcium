import {
  Component,
  computed,
  inject,
  type OnInit,
  type Signal,
} from '@angular/core';
import { CalciumService } from './shared/calcium.service';
import type { CreateCalciumItemDto } from './shared/calcium-item';
import { EditItemModal } from './ui/edit-item-modal/edit-item-modal';
import { EmptyListItem } from './ui/empty-list-item/empty-list-item';
import { ListItem, type unitsChangedEvent } from './ui/list-item/list-item';
import { ResultCard } from './ui/result-card/result-card';

@Component({
  selector: 'app-root',
  imports: [ListItem, EmptyListItem, ResultCard, EditItemModal],
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected calciumService = inject(CalciumService);
  protected showEditModal = false;

  public ngOnInit(): void {
    this.calciumService.getAllCalciumItems();
  }

  protected calciumAmount: Signal<number> = computed(() => {
    return this.calciumService.calciumItems().reduce((total, item) => {
      return total + item.calcium_per_unit * item.servings;
    }, 0);
  });

  protected updateUnits(newValue: unitsChangedEvent): void {
    this.calciumService.updateUnits(newValue);
  }

  protected showModal(): void {
    this.showEditModal = true;
  }

  protected hideModal(): void {
    this.showEditModal = false;
  }

  protected saveItem(item: CreateCalciumItemDto) {
    this.calciumService.saveCalciumItem(item);
    this.showEditModal = false;
  }
}
