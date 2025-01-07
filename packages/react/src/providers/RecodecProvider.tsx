import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { RecodecContext, RecodecState, RecodecStore } from "./RecodecContext";
import { CompositionMetadata } from "@recodec/core";

export interface RecodecProviderProps {
  metadata: CompositionMetadata;
}

export const RecodecProvider: React.FC<
  PropsWithChildren<RecodecProviderProps>
> = ({ children, metadata }) => {
  const [state, setState] = useState<RecodecState>({
    metadata,
    composition: { durationInFrames: 0, items: {} }
  });

  const { fps, height, width } = metadata;
  useEffect(() => {
    setState(state => ({ ...state, metadata: { fps, height, width } }));
  }, [fps, height, width]);

  const calculateDurationInFrames = useCallback(
    ({ metadata, composition: { items } }: RecodecState) => {
      let maxDuration = 0;
      for (const id in items) {
        const { from, duration } = items[id];
        maxDuration = Math.max(maxDuration, from + duration);
      }

      return Math.round(maxDuration * metadata.fps);
    },
    []
  );

  const setItem: RecodecStore["setItem"] = useCallback(
    item => {
      setState(state => {
        const nextState: RecodecState = {
          ...state,
          composition: { ...state.composition }
        };

        nextState.composition.items[item.id] = item;
        nextState.composition.durationInFrames =
          calculateDurationInFrames(nextState);

        return nextState;
      });
    },
    [setState, calculateDurationInFrames]
  );

  const removeItem: RecodecStore["removeItem"] = useCallback(
    id => {
      setState(state => {
        if (!state.composition.items[id]) return state;
        const nextState: RecodecState = {
          ...state,
          composition: { ...state.composition }
        };

        delete nextState.composition.items[id];
        nextState.composition.durationInFrames =
          calculateDurationInFrames(nextState);

        return nextState;
      });
    },
    [setState, calculateDurationInFrames]
  );

  const value = useMemo(
    () => ({ state, setItem, removeItem }),
    [state, setItem, removeItem]
  );
  return (
    <RecodecContext.Provider value={value}>{children}</RecodecContext.Provider>
  );
};
