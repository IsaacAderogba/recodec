import { AudioCompositionItem, AudioSequenceData } from "@recodec/core";
import { useCompositionItemSync } from "../hooks/useCompositionSync";
import { useMemo } from "react";

export interface AudioSequenceProps extends AudioSequenceData {
  from: number;
  duration: number;
}

export const AudioSequence: React.FC<AudioSequenceProps> = ({
  from,
  duration,
  src
}) => {
  const item: Omit<AudioCompositionItem, "id"> = useMemo(() => {
    return { type: "audio", from, duration, data: { src } };
  }, [from, duration, src]);
  useCompositionItemSync(item);

  return null;
};
