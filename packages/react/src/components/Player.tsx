import { Composition, CompositionProps } from "@recodec/core";
import { ComponentType } from "react";

export interface PlayerProps<T extends CompositionProps> {
  Component: ComponentType<T>;
  composition: Composition<T>;
}

export function Player<T extends CompositionProps>({
  Component,
  composition
}: PlayerProps<T>) {
  return <Component {...composition.props} />;
}
