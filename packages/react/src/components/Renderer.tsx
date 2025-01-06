import { ComponentType } from "react";
import { CompositionProvider } from "../providers/CompositionProvider";
import { CompositionMetadata, CompositionProps } from "../utilities/types";

export interface RendererProps<T extends CompositionProps> {
  metadata: CompositionMetadata;
  compositionProps: T;
  Composition: ComponentType<T>;
}

export function Renderer<T extends CompositionProps>({
  Composition,
  compositionProps
}: RendererProps<T>) {
  return (
    <CompositionProvider>
      <Composition {...compositionProps} />
    </CompositionProvider>
  );
}
