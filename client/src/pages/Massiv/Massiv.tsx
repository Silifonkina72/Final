import React from "react";
import { useState } from "react";
import Karusel from "../../components/Karusel/Karusel";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { StainsThunk } from "../../store/thunkActions/StainThunk";
import { useEffect } from "react";
import { GroundThunk } from "../../store/thunkActions/groundThunk";
import { LakThunk } from "../../store/thunkActions/lakThunk";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, Text } from "@mantine/core";
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

  const laks = useAppSelector((store) => store.lakSlice.stains);

  const [opened, { open, close }] = useDisclosure(false);
  

  return (
    <>
      <div>Massiv</div>
      <Karusel arr={stains} model={"Stain"} />
      <br />
      <Karusel arr={grounds} model={"Ground"} />
      <br />
      <Karusel arr={laks} model={"Lak"} />

      <Modal opened={opened} onClose={close} title="Authentication">
        <Text>Modal with size auto will fits its content</Text>
        <Group wrap="nowrap" mt="md">
          {['1', '2', '3', '4', '5', '6', '7', '8'].map((item) => (
            <Text key={item}>{item}</Text>
          ))}
        </Group>
        <Group mt="xl">
          <Button onClick={close}>Remove badge</Button>
        </Group>
      </Modal>

      <Button onClick={open}>Open modal</Button>
    
    </>
  );
};

export default Massiv;
