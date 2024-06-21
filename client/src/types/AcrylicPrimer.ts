export type AcrylicPrimer = {
    id: number;
    priceArea: number;
    priceVolume: number;
    name: string;
    number: number;
    img: string;
  }

  export type AcrylicPrimers = Array<AcrylicPrimer>;


  export type AcrylicPrimerSlice = {
    acrylicPrimers: AcrylicPrimer[];
    error: string | null;
  }