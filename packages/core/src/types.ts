export type CompositionMetadata = {
  fps: number;
  durationInFrames: number;
  height: number;
  width: number;
};

export type CompositionProps = Record<string, any>;

export interface Composition {
  props: CompositionProps;
  metadata: CompositionMetadata;
}

export type CompositionState = {
  foo: "bar";
};

declare global {
  interface Window {
    composition: Composition;
    compositionState: CompositionState;
  }
}
