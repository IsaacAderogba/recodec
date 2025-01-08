import { CompositionProps } from "@recodec/core";
import React, {
  ComponentType,
  SyntheticEvent,
  useImperativeHandle,
  useLayoutEffect,
  useRef
} from "react";
import { useRecodecStore } from "../providers/RecodecContext";
import { EventEmitter } from "../utilities/EventEmitter";

export interface PlayerProps {
  Component: ComponentType<CompositionProps>;
  composition: CompositionProps;
}

export type PlayerAPI = {
  play: (event?: SyntheticEvent) => void;
  pause: () => void;
  frame: (frame: number) => void;
};

export type PlayerRef = Pick<PlayerAPI, "play" | "pause"> &
  Pick<EventEmitter<PlayerAPI>, "on">;

export const Player = React.forwardRef<PlayerRef, PlayerProps>(
  ({ Component, composition }, ref) => {
    const { state, setState } = useRecodecStore();

    const emitter = useRef(new EventEmitter<PlayerAPI>());
    const handler = useRef<PlayerAPI>({
      play: event => {
        setState(state => ({ ...state, status: "play" }));
        emitter.current.emit("play", event);
      },
      pause: () => {
        setState(state => ({ ...state, status: "pause" }));
        emitter.current.emit("pause");
      },
      frame: frame => {
        emitter.current.emit("frame", frame);
      }
    });

    useImperativeHandle(
      ref,
      () => ({
        play: handler.current.play,
        pause: handler.current.pause,
        on: emitter.current.on
      }),
      []
    );

    const intervalId = useRef<NodeJS.Timeout>();
    useLayoutEffect(() => {
      switch (state.status) {
        case "play":
          setState(state => {
            return {
              ...state,
              status: "playing",
              frame: state.frame >= state.composition.duration ? 0 : state.frame
            };
          });
          return;
        case "playing":
          clearInterval(intervalId.current);
          intervalId.current = setInterval(() => {
            setState(state => {
              if (state.status === "pause") return state;
              if (state.frame >= state.composition.duration) {
                return { ...state, status: "pause" };
              } else {
                return { ...state, frame: state.frame + 1 };
              }
            });
          }, 1000 / state.metadata.fps);
          return;
        case "pause":
          clearInterval(intervalId.current);
          return;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.status, state.metadata.fps]);

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <progress value={state.frame} max={state.composition.duration} />
          {state.status === "playing" ? (
            <button onClick={handler.current.pause}>pause</button>
          ) : (
            <button onClick={handler.current.play}>play</button>
          )}
        </div>
        <Component {...composition} />
        {/* <audio
          controls
          src="https://samplelib.com/lib/preview/mp3/sample-9s.mp3"
        ></audio> */}
      </div>
    );
  }
);
