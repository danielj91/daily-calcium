import { Component, input } from '@angular/core';

@Component({
  selector: 'app-result-card',
  imports: [],
  templateUrl: './result-card.html',
})
export class ResultCard {
  value = input(0);
}
