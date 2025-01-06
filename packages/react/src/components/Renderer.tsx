import { ComponentType } from "react";
import { CompositionProvider } from "../providers/CompositionProvider";
import { CompositionProps } from "../utilities/types";

export interface RendererProps<T extends CompositionProps> {
  Component: ComponentType<T>;
  // composition: {
  //   props: T;
  //   metadata: CompositionMetadata;
  // };
}

export function Renderer<T extends CompositionProps>(props: RendererProps<T>) {
  return (
    <CompositionProvider>
      {/* <Component {...composition.props} /> */}
    </CompositionProvider>
  );
}
