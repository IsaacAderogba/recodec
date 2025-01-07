import { AudioCompositionItem, AudioSequenceData } from "@recodec/core";
import { useCompositionItemSync } from "../hooks/useCompositionSync";
import { useMemo } from "react";

export interface AudioSequenceProps extends AudioSequenceData {
  from: number;
  durationInFrames: number;
}

export const AudioSequence: React.FC<AudioSequenceProps> = ({
  from,
  durationInFrames,
  src
}) => {
  const item: Omit<AudioCompositionItem, "id"> = useMemo(() => {
    return { type: "audio", from, durationInFrames, data: { src } };
  }, [from, durationInFrames, src]);
  useCompositionItemSync(item);

  return null;
};
