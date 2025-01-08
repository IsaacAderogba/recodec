import { AudioCompositionItem, AudioSequenceData } from "@recodec/core";
import { useLayoutEffect, useMemo, useRef } from "react";
import { useCompositionItemSync } from "../hooks/useCompositionSync";
import { RecodecStatus, useRecodecStore } from "../providers/RecodecContext";

export interface AudioSequenceProps extends AudioSequenceData {
  from: number;
  duration: number;
}

export const AudioSequence: React.FC<AudioSequenceProps> = ({
  from,
  duration,
  src
}) => {
  const { state } = useRecodecStore();
  const item: Omit<AudioCompositionItem, "id"> = useMemo(() => {
    return { type: "audio", from, duration, data: { src } };
  }, [from, duration, src]);
  useCompositionItemSync(item);

  const status = useMemo((): RecodecStatus => {
    if (state.status === "pause") return "pause";

    const to = from + duration;
    if (state.frame === from) {
      return "play";
    } else if (state.frame > from && state.frame < to) {
      return "playing";
    } else {
      return "pause";
    }
  }, [state.status, state.frame, from, duration]);

  const audioRef = useRef<HTMLAudioElement>(null);
  useLayoutEffect(() => {
    if (!audioRef.current) return;
    switch (status) {
      case "play": {
        audioRef.current.currentTime = 0;
        return;
      }
      case "playing":
        if (audioRef.current.paused) {
          audioRef.current.play();
        }
        return;
      case "pause":
        audioRef.current.pause();
        return;
    }
  }, [status]);

  return (
    <audio
      ref={audioRef}
      controls
      src={src}
      style={{ display: "none" }}
    ></audio>
  );
};
