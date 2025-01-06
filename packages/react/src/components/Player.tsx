import { Composition } from "@recodec/core";
import { ComponentType } from "react";
import { CompositionProvider } from "../providers/CompositionProvider";

export interface PlayerProps {
  Component: ComponentType;
  composition: Composition;
}

export const Player: React.FC<PlayerProps> = ({ Component, composition }) => {
  return (
    <CompositionProvider>
      <Component {...composition.props} />
    </CompositionProvider>
  );
};
