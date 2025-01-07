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

export const useCompositionStateSync = (state: CompositionState) => {
  useEffect(() => {
    console.log("state", state);
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
