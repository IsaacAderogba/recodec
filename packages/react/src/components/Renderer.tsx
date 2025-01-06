import { ComponentType } from "react";
import { CompositionProvider } from "../providers/CompositionProvider";

export interface RendererProps {
  Component: ComponentType<any>;
}

export const Renderer: React.FC<RendererProps> = ({ Component }) => {
  /**
   * todo: retrieve composition from window and sync back up
   */
  return (
    <CompositionProvider>
      {/* <Component {...composition.props} /> */}
    </CompositionProvider>
  );
};
