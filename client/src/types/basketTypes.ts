export type Product = {
  model: string;
  id: number;
  name: string;
  priceArea: number;
  priceVolume: number;
  img?: string;
  // number: number;
  // onlyMdf?: boolean;
  // highGrade?: boolean;
  // intensity?: number | null;
};

export type Price = {
  allPrice: number;
};
