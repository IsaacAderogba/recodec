export type CompositionMetadata = {
  fps: number;
  height: number;
  width: number;
};

export type CompositionProps = Record<string, any>;

export type CompositionState = {
  durationInFrames: number;
  items: Record<string, CompositionItem>;
};

export type CompositionItem = VideoCompositionItem | AudioCompositionItem;

export interface VideoCompositionItem extends BaseCompositionItem {
  type: "video";
  data: VideoSequenceData;
}

export interface VideoSequenceData extends BaseSequenceData {
  src: string;
}

export interface AudioCompositionItem extends BaseCompositionItem {
  type: "audio";
  data: AudioSequenceData;
}

export interface AudioSequenceData extends BaseSequenceData {
  src: string;
}

export interface BaseCompositionItem {
  id: string;
  type: CompositionType;
  from: number;
  duration: number;
  createdAt: string;
  updatedAt: string;
}

export interface BaseSequenceData {}

export type CompositionType = "video" | "audio";

declare global {
  interface Window {
    compositionProps: CompositionProps;
    compositionState: CompositionState;
  }
}
