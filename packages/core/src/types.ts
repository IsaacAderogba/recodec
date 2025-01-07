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

export interface VideoSequenceData {
  src: string;
}

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
  durationInFrames: number;
}

export type CompositionType = "video" | "audio";

declare global {
  interface Window {
    compositionProps: CompositionProps;
    compositionState: CompositionState;
  }
}
