export type Product = {
  id: number;
  model: string;
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
