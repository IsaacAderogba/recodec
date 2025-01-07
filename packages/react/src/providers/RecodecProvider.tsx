import { PropsWithChildren } from "react";
import { RecodecContext } from "./RecodecContext";

export interface RecodecProviderProps {}

export const RecodecProvider: React.FC<
  PropsWithChildren<RecodecProviderProps>
> = ({ children }) => {
  return (
    <RecodecContext.Provider value={undefined}>
      {children}
    </RecodecContext.Provider>
  );
};
