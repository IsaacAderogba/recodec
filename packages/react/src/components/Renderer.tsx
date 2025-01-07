import { CompositionProps } from "@recodec/core";
import { ComponentType } from "react";

export interface RendererProps<T extends CompositionProps> {
  Component: ComponentType<T>;
  composition: T;
}

export function Renderer<T extends CompositionProps>({
  Component,
  composition
}: RendererProps<T>) {
  return <Component {...composition} />;
}
