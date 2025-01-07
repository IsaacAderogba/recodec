import { CompositionProps, CompositionState } from "@recodec/core";
import { useEffect, useState } from "react";

export const useCompositionStateSync = (state: CompositionState) => {
  useEffect(() => {
    if (!window.compositionProps) return;
    window.compositionState = state;
  }, [state]);
};

export const useCompositionPropsSync = <T extends CompositionProps>(
  props: T
) => {
  const [compositionProps, setCompositionProps] = useState(props);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!window.compositionProps) return;
      clearInterval(interval);
      setCompositionProps(window.compositionProps as T);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return compositionProps;
};
