export type CompositionMetadata = {
  fps: number;
  height: number;
  width: number;
};

export type CompositionProps = Record<string, any>;

export type CompositionState = {
  duration: number;
  items: Record<string, CompositionItem>;
};

export type CompositionItem = AudioCompositionItem;

export interface AudioCompositionItem extends BaseCompositionItem {
  type: "audio";
  data: AudioSequenceData;
}

export interface AudioSequenceData {
  src: string;
}

export interface BaseCompositionItem {
  id: string;
  type: CompositionType;
  from: number;
  duration: number;
}

export type CompositionType = "audio";

declare global {
  interface Window {
    compositionProps: CompositionProps;
    compositionState: CompositionState;
  }
}
