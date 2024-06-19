import React from "react";
import Karusel from "../../components/Karusel/Karusel";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { StainsThunk } from "../../store/thunkActions/StainThunk";
import { useEffect } from "react";

const Massiv = () => {
  useEffect(() => {
    void dispatch(StainsThunk());
  }, []);

  const dispatch = useAppDispatch();
  const stains = useAppSelector((store) => store.stainSlice.stains);

  return (
    <>
      <div>Massiv</div>
      <Karusel stains={stains} />
    </>
  );
};

export default Massiv;
