import { useAppDispatch } from '../../hooks';
import { useEffect } from 'react';
import { primerInsulatorThunk } from '../../store/thunkActions/primerInsulatorThunk';
import { paintThunk } from '../../store/thunkActions/paintThunk';
import { acrylicPrimerThunk } from '../../store/thunkActions/acrylicPrimerThunk'
import { patinaThunk } from "../../store/thunkActions/patinaThunk";
import { GroundThunk } from "../../store/thunkActions/groundThunk";
 import { LakThunkMdf } from "../../store/thunkActions/lakThunk";
 import { StainsThunk } from "../../store/thunkActions/StainThunk";

export const useStartEffectMdf = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(primerInsulatorThunk());
  }, []);

  useEffect(() => {
    void dispatch(paintThunk());
  }, []);

  useEffect(() => {
    void dispatch(acrylicPrimerThunk());
  }, []);

  useEffect(() => {
    void dispatch(patinaThunk());
  }, []);

  useEffect(() => {
    void dispatch(GroundThunk());
  }, []);

  useEffect(() => {
    void dispatch(LakThunkMdf());
  }, []);

  // useEffect(() => {
  //   void dispatch(StainsThunk());
  // }, []);
};
