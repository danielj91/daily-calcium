export interface CalciumItem {
  id: string;
  name: string;
  calcium_per_unit: number;
  units: number;
}

export interface CreateCalciumItemDto {
  name: string;
  calcium_per_unit: number;
  units: number;
}

export type UpdateCalciumItemDto = Partial<CreateCalciumItemDto>;
