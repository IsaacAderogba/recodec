import { CompositionProps } from "@recodec/core";
import React, {
  ComponentType,
  Fragment,
  SyntheticEvent,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { EventEmitter } from "../utilities/EventEmitter";

export interface PlayerProps {
  Component: ComponentType<CompositionProps>;
  composition: CompositionProps;
}

export interface PlayerState {
  state: "play" | "playing" | "paused";
  frame: number;
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
    const [state, setState] = useState<PlayerState>({
      state: "paused",
      frame: 0
    });

    const emitter = useRef(new EventEmitter<PlayerAPI>());
    const handler = useRef<PlayerAPI>({
      play: event => {
        emitter.current.emit("play", event);
      },
      pause: () => {
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

    return (
      <Fragment>
        <Component {...composition} />;
      </Fragment>
    );
  }
);
