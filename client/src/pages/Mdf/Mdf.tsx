import React from "react";
import { useState } from "react";
import Karusel from "../../components/Karusel/Karusel";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { primerInsulatorThunk } from "../../store/thunkActions/primerInsulatorThunk";
import { useEffect } from "react";
import { paintThunk } from "../../store/thunkActions/paintThunk";
import { acrylicPrimerThunk } from '../../store/thunkActions/acrylicPrimerThunk'
import { patinaThunk } from "../../store/thunkActions/patinaThunk";
 import { GroundThunk } from "../../store/thunkActions/groundThunk";
 import { LakThunkMdf } from "../../store/thunkActions/lakThunk";


export default function Mdf() {
  useEffect(() => {
    void dispatch(primerInsulatorThunk());
  }, []);

  const dispatch = useAppDispatch();
  const primerInsulators = useAppSelector(
    (store) => store.primerInsulatorSlice.primerInsulators
  );

  useEffect(() => {
    void dispatch(paintThunk());
  }, []);
  const paints = useAppSelector((store) => store.paintSlice.paints);
  
  useEffect(() => {
    void dispatch(acrylicPrimerThunk());
  }, []);
  const acrylicPrimers = useAppSelector((store) => store.acrylicPrimerSlice.acrylicPrimers);

  useEffect(() => {
    void dispatch(patinaThunk());
  }, []);
  const patinas = useAppSelector((store) => store.patinaSlice.patinas);

  useEffect(() => {
    void dispatch(LakThunkMdf());
  }, []);
  const laks = useAppSelector((store) => store.lakSlice.laks);

  useEffect(() => {
    void dispatch(GroundThunk());
  }, []);
  const grounds = useAppSelector((store) => store.groundSlice.grounds);

  return (
    <>
      <div>Mdf</div>

      <Karusel stains={primerInsulators} model={"PrimerInsulator"} />
      <br />
      <Karusel stains={paints} model={"Paint"} />
      <br />
      <Karusel stains={acrylicPrimers} model={"AcrylicPrimer"} />
      <br />
      <Karusel stains={patinas} model={"Patina"} />
      <br />
      <Karusel stains={laks} model={"Lak"} />
      <br />
      <Karusel stains={grounds} model={"Ground"} />
    </>
  );
}
