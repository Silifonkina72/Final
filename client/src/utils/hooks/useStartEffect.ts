import { StainsThunk } from '../../store/thunkActions/StainThunk';
import { useEffect } from 'react';
import { GroundThunk } from '../../store/thunkActions/groundThunk';
import { LakThunk } from '../../store/thunkActions/lakThunk';
import { useAppDispatch } from '../../hooks';

export const useStartEffect = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    void dispatch(StainsThunk());
  }, []);

  useEffect(() => {
    void dispatch(GroundThunk());
  }, []);

  useEffect(() => {
    void dispatch(LakThunk());
  }, []);
};
