import { createContext } from "react";

export interface CompositionState {}

export interface CompositionStore {}

export const CompositionContext = createContext<CompositionStore | undefined>(
  undefined
);
