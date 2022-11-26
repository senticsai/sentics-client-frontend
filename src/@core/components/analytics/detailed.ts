import React, {Dispatch, SetStateAction} from 'react';

export const replayDate = 1669132897611;

export const POLYGON: [number, number][] = [
  [1.42, 0.0],
  [1.42, 53.6],
  [0.0, 54.97],
  [0.0, 75.16],
  [-1.53, 75.16],
  [-1.53, 83.46],
  [26.22, 55.49],
  [26.22, 0.0],
  [10.69, 0.0],
  [10.69, 1.037],
  [4.85, 1.037],
  [4.85, 0.0],
  [1.42, 1.037]
]

export const oneHourAgo = new Date();
oneHourAgo.setHours(oneHourAgo.getHours() - 1);

export const currentDate = new Date();

export default React.createContext({
  oneHourAgo,
  currentDate,
  replay: {
    setShow: empty,
    setTime: empty,
    setCompartment: empty,
    show: false,
    time: 0,
    date: replayDate,
    compartment: 0,
  },
  spaghetti: {
    setShow: empty,
    setLineWidth: empty,
    lineWidth: 1,
    show: false,
  }
});

function empty(value: any) {}
