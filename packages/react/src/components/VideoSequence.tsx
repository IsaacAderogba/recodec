import { VideoCompositionItem, VideoSequenceData } from "@recodec/core";
import { useCompositionItemSync } from "../hooks/useCompositionSync";
import { useMemo } from "react";

export interface VideoSequenceProps extends VideoSequenceData {
  from: number;
  duration: number;
}

export const VideoSequence: React.FC<VideoSequenceProps> = ({
  from,
  duration,
  src
}) => {
  const item: Omit<VideoCompositionItem, "id"> = useMemo(() => {
    return { type: "video", from, duration, data: { src } };
  }, [from, duration, src]);
  useCompositionItemSync(item);

  return null;
};
