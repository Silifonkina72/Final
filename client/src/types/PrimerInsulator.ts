export type PrimerInsulator = {
    id: number;
    priceArea: number;
    priceVolume: number;
    name: string;
    number: number;
    img: string;
  }

  export type PrimerInsulators = Array<PrimerInsulator>;


  export type PrimerInsulatorSlice = {
    primerInsulators: PrimerInsulator[];
    error: string | null;
  }

  