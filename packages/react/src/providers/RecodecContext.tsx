import { CompositionMetadata, CompositionState } from "@recodec/core";
import { createContext, Dispatch, SetStateAction } from "react";

export interface RecodecState {
  composition: CompositionState;
  metadata: CompositionMetadata;
}

export interface RecodecStore {
  state: RecodecState;
  setState: Dispatch<SetStateAction<RecodecState>>;
}

export const RecodecContext = createContext<RecodecStore | undefined>(
  undefined
);
