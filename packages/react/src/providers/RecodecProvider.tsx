import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { RecodecContext, RecodecState } from "./RecodecContext";
import { CompositionMetadata } from "@recodec/core";

export interface RecodecProviderProps {
  metadata: CompositionMetadata;
}

export const RecodecProvider: React.FC<
  PropsWithChildren<RecodecProviderProps>
> = ({ children, metadata }) => {
  const [state, setState] = useState<RecodecState>({
    metadata,
    composition: { items: {} }
  });

  const { fps, height, width } = metadata;
  useEffect(() => {
    setState(state => ({ ...state, metadata: { fps, height, width } }));
  }, [fps, height, width]);

  const value = useMemo(() => ({ state, setState }), [state, setState]);
  return (
    <RecodecContext.Provider value={value}>{children}</RecodecContext.Provider>
  );
};
