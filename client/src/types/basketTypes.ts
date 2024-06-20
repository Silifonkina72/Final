export type Product = {
  model: string;
  id: number;
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

export type Price = {
  allPrice: number
}

export type BasketState = {
  items: Product[];
  allPrice: Price[]
  status: "idle" | "loading" | "failed";
};
