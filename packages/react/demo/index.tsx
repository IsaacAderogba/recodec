import { createRoot } from "react-dom/client";
import { Player, RecodecProvider } from "../src";
import { Composition } from "./Composition";

const App: React.FC = () => {
  return (
    <RecodecProvider metadata={{ fps: 30, width: 1920, height: 1080 }}>
      <Player Component={Composition} composition={{}} />
    </RecodecProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
