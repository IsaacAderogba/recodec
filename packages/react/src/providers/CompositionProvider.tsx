import { PropsWithChildren } from "react";
import { CompositionContext } from "./CompositionContext";

export interface CompositionProviderProps {}

export const CompositionProvider: React.FC<
  PropsWithChildren<CompositionProviderProps>
> = ({ children }) => {
  // will get the required props from above
  return (
    <CompositionContext.Provider value={undefined}>
      {children}
    </CompositionContext.Provider>
  );
};
