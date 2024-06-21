export type Product = {
  id: number;
  model: string;
  name: string;
  // priceArea: number;
  // priceVolume: number;
  // name: string;
  // number: number;
  // img?: string;
  // onlyMdf?: boolean;
  // highGrade?: boolean;
  // intensity?: number | null;
};

export type BasketState = {
  items: Product[];
  status: "idle" | "loading" | "failed";
};
