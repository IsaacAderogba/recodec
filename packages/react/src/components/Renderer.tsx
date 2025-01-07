import { CompositionProps } from "@recodec/core";
import { ComponentType } from "react";
import { useCompositionPropsSync } from "../hooks/useCompositionSync";

export interface RendererProps<T extends CompositionProps> {
  Component: ComponentType<T>;
  composition: T;
}

export function Renderer<T extends CompositionProps>({
  Component,
  composition
}: RendererProps<T>) {
  const props = useCompositionPropsSync(composition);

  return <Component {...props} />;
}
