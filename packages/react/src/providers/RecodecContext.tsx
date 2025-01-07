import {
  CompositionItem,
  CompositionMetadata,
  CompositionState
} from "@recodec/core";
import { createContext, useContext, useEffect } from "react";

export interface RecodecState {
  composition: CompositionState;
  metadata: CompositionMetadata;
}

export interface RecodecStore {
  state: RecodecState;
  setItem: (item: CompositionItem) => void;
  removeItem: (id: string) => void;
}

export const RecodecContext = createContext<RecodecStore | undefined>(
  undefined
);

export const useRecodecStore = () => {
  const store = useContext(RecodecContext);
  if (!store) {
    throw new Error("recodec hooks must be used within a RecodecProvider");
  }

  return store;
};
