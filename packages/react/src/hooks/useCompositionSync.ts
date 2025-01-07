import { v4 } from "uuid";
import {
  CompositionItem,
  CompositionProps,
  CompositionState
} from "@recodec/core";
import { useEffect, useState } from "react";
import { useRecodecStore } from "../providers/RecodecContext";

export const useCompositionItemSync = (item: Omit<CompositionItem, "id">) => {
  const [id] = useState(v4());
  const { setItem, removeItem } = useRecodecStore();

  useEffect(() => {
    setItem({ id, ...item });
  }, [id, item]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return () => removeItem(id);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps
};

export const useCompositionStateSync = (
  state: CompositionState,
  props: { isRendering: boolean }
) => {
  useEffect(() => {
    if (!props.isRendering) return;
    window.compositionState = state;
  }, [props.isRendering, state]);
};

export const useCompositionPropsSync = <T extends CompositionProps>(
  props: T
) => {
  const [compositionProps, setCompositionProps] = useState(props);
  const { setState } = useRecodecStore();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!window.compositionProps) return;
      clearInterval(interval);
      setCompositionProps(window.compositionProps as T);
      setState(state => ({ ...state, isRendering: true }));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return compositionProps;
};
