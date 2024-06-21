export type Paint = {
    id: number;
    priceArea: number;
    priceVolume: number;
    highGrade: boolean;
    name: string;
    number: number;
    img: string;
  }

  export type Paints = Array<Paint>;


  export type PaintSlice = {
    paints: Paint[];
    error: string | null;
  }