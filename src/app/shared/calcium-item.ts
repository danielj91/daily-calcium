export interface CalciumItem {
  id: string;
  name: string;
  calcium_per_unit: number;
  units: number;
  unit_type: string;
  servings: number;
}

export interface CreateCalciumItemDto {
  name: string;
  calcium_per_unit: number;
  units: number;
  unit_type: string;
}

export type UpdateCalciumItemDto = Partial<CreateCalciumItemDto>;
