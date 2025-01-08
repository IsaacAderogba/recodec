import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { RecodecContext, RecodecState, RecodecStore } from "./RecodecContext";
import { CompositionMetadata } from "@recodec/core";
import { useCompositionStateSync } from "../hooks/useCompositionSync";

export interface RecodecProviderProps {
  metadata: CompositionMetadata;
}

export const RecodecProvider: React.FC<
  PropsWithChildren<RecodecProviderProps>
> = ({ children, metadata }) => {
  const [state, setState] = useState<RecodecState>({
    status: "pause",
    frame: 0,
    isRendering: false,
    metadata,
    composition: { duration: 0, items: {} }
  });
  useCompositionStateSync(state.composition, {
    isRendering: state.isRendering
  });

  const { fps, height, width } = metadata;
  useEffect(() => {
    setState(state => ({ ...state, metadata: { fps, height, width } }));
  }, [fps, height, width]);

  const setItem: RecodecStore["setItem"] = useCallback(item => {
    setState(state => {
      const nextState: RecodecState = {
        ...state,
        composition: { ...state.composition }
      };

      nextState.composition.items[item.id] = item;
      nextState.composition.duration = calculateDuration(nextState);

      return nextState;
    });
  }, []);

  const removeItem: RecodecStore["removeItem"] = useCallback(id => {
    setState(state => {
      if (!state.composition.items[id]) return state;
      const nextState: RecodecState = {
        ...state,
        composition: { ...state.composition }
      };

      delete nextState.composition.items[id];
      nextState.composition.duration = calculateDuration(nextState);

      return nextState;
    });
  }, []);

  return (
    <RecodecContext.Provider value={{ state, setState, setItem, removeItem }}>
      {children}
    </RecodecContext.Provider>
  );
};

const calculateDuration = (state: RecodecState) => {
  let maxDuration = 0;
  for (const id in state.composition.items) {
    const { from, duration } = state.composition.items[id];
    maxDuration = Math.max(maxDuration, from + duration);
  }

  return maxDuration;
};
