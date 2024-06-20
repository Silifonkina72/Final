export type Stain = {
    id: number;
    priceArea: number;
    priceVolume: number;
    intensity: number;
    name: string;
    number: number;
    img: string;
  }

  export type Stains = Array<Stain>;


  export type StainSlice = {
    stains: Stain[];
    error: string | null;
  }

  export type ListPropsTypeStain = {
    stains: Stains
  }

  
 