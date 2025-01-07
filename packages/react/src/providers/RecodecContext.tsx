import { createContext } from "react";

export interface RecodecState {}

export interface RecodecStore {}

export const RecodecContext = createContext<RecodecStore | undefined>(
  undefined
);
