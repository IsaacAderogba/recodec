import { ComponentType } from "react";
import { CompositionProvider } from "../providers/CompositionProvider";
import { CompositionMetadata, CompositionProps } from "../utilities/types";

export interface PlayerProps<T extends CompositionProps> {
  Component: ComponentType<T>;
  composition: {
    props: T;
    metadata: CompositionMetadata;
  };
}

export function Player<T extends CompositionProps>({
  Component,
  composition
}: PlayerProps<T>) {
  return (
    <CompositionProvider>
      <Component {...composition.props} />
    </CompositionProvider>
  );
}
