import { VideoCompositionItem, VideoSequenceData } from "@recodec/core";
import { useCompositionItemSync } from "../hooks/useCompositionSync";
import { useMemo } from "react";

export interface VideoSequenceProps extends VideoSequenceData {
  from: number;
  durationInFrames: number;
}

export const VideoSequence: React.FC<VideoSequenceProps> = ({
  from,
  durationInFrames,
  src
}) => {
  const video: Omit<VideoCompositionItem, "id"> = useMemo(() => {
    return { type: "video", from, durationInFrames, data: { src } };
  }, [from, durationInFrames, src]);
  useCompositionItemSync(video);

  return null;
};
