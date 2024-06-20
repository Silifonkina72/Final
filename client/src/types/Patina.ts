export type Patina = {
    id: number;
    priceArea: number;
    priceVolume: number;
    name: string;
    number: number;
    img: string;
  }

  export type Patinas = Array<Patina>;


  export type PatinaSlice = {
    patinas: Patina[];
    error: string | null;
  }