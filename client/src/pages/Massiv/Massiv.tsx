import React from "react";
import { useState } from "react";
import Karusel from "../../components/Karusel/Karusel";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { StainsThunk } from "../../store/thunkActions/StainThunk";
import { useEffect } from "react";
import { GroundThunk } from "../../store/thunkActions/groundThunk";
import { LakThunk } from "../../store/thunkActions/lakThunk";
import { Tabs, rem } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';

const Massiv = () => {
  useEffect(() => {
    void dispatch(StainsThunk());
  }, []);

  const dispatch = useAppDispatch();
  const stains = useAppSelector((store) => store.stainSlice.stains);

  useEffect(() => {
    void dispatch(GroundThunk());
  }, []);

  const grounds = useAppSelector((store) => store.groundSlice.grounds);

  useEffect(() => {
    void dispatch(LakThunk());
  }, []);

  const laks = useAppSelector((store) => store.lakSlice.laks);

  

  return (
    <>
      <div>Massiv</div>
      <Karusel arr={stains} model={"Stain"} />
      <br />
      <Karusel arr={grounds} model={"Ground"} />
      <br />
      <Karusel arr={laks} model={"Lak"} />

    
    </>
  );
};

export default Massiv;
