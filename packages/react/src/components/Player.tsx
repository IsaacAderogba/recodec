import { ComponentType } from "react";
import { CompositionProvider } from "../providers/CompositionProvider";
import { CompositionMetadata, CompositionProps } from "../utilities/types";

export interface PlayerProps<T extends CompositionProps> {
  metadata: CompositionMetadata;
  compositionProps: T;
  Composition: ComponentType<T>;
}

export function Player<T extends CompositionProps>({
  Composition,
  compositionProps
}: PlayerProps<T>) {
  return (
    <CompositionProvider>
      <Composition {...compositionProps} />
    </CompositionProvider>
  );
}
