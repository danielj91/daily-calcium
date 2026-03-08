import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import type { unitsChangedEvent } from '../ui/list-item/list-item';
import type { CalciumItem } from './calcium-item';

@Injectable({
  providedIn: 'root',
})
export class CalciumService {
  private readonly apiUrl = '/api/calcium-items';
  private readonly http = inject(HttpClient);
  private readonly _calciumItems = signal<CalciumItem[]>([]);
  public readonly calciumItems = this._calciumItems.asReadonly();

  public getAllCalciumItems(): void {
    this.http.get<CalciumItem[]>(this.apiUrl).subscribe((items) => {
      this._calciumItems.set(items);
    });
  }

  public saveCalciumItem(item: CalciumItem): void {
    this.http.post<CalciumItem>(this.apiUrl, item).subscribe((savedItem) => {
      this._calciumItems.update((list) => [...list, savedItem]);
    });
  }

  public updateCalciumItem(item: CalciumItem) {
    this.http.patch<CalciumItem>(this.apiUrl, item).subscribe((updatedItem) => {
      this._calciumItems.update((list) => [...list, updatedItem]);
    });
  }

  public deleteCalciumItem(id: string) {
    this.http
      .delete(`${this.apiUrl}/${id}`, { observe: 'response' })
      .subscribe((res) => {
        if (res.ok) {
          const index = this._calciumItems().findIndex(
            (item) => item.id === id,
          );
          if (index !== -1) {
            this._calciumItems.update((list) => list.splice(index, 1));
          }
        }
      });
  }

  public updateUnits(newValue: unitsChangedEvent): void {
    this._calciumItems.update((items) =>
      items.map((item) =>
        item.id === newValue.id ? { ...item, units: newValue.units } : item,
      ),
    );
  }
}
