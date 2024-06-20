export type Lak = {
    id: number;
    priceArea: number;
    priceVolume: number;
    onlyMdf: boolean;
    name: string;
    number: number;
    img: string;
  }

  
  export type Laks = Array<Lak>;


  export type LakSlice = {
    stains: Lak[];
    error: string | null;
  }

  export type ListPropsTypeStain = {
    stains: Laks
  }

  
 