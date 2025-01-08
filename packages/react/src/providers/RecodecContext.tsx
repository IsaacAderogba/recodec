import {
  CompositionItem,
  CompositionMetadata,
  CompositionState
} from "@recodec/core";
import { createContext, useContext } from "react";

export type RecodecStatus = "play" | "playing" | "pause";
export interface RecodecState {
  status: RecodecStatus;
  frame: number;
  isRendering: boolean;
  composition: CompositionState;
  metadata: CompositionMetadata;
}

export interface RecodecStore {
  state: RecodecState;
  setState: React.Dispatch<React.SetStateAction<RecodecState>>;
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
