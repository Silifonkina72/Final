export type Ground {
    id: number;
    priceArea: number;
    priceVolume: number;
    name: string;
    number: number;
    img: string;
  }

  export type Grounds = Array<Ground>;


  export type GroundSlice {
    stains: Ground[];
    error: string | null;
  }

  export type ListPropsTypeStain = {
    stains: Grounds
  }

  
 