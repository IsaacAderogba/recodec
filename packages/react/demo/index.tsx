import { createRoot } from "react-dom/client";
import { Player, RecodecProvider } from "../src";
import { Composition } from "./Composition";

const App: React.FC = () => {
  return (
    <RecodecProvider metadata={{ fps: 30, width: 1920, height: 1080 }}>
      <Player
        Component={Composition}
        composition={{
          data: [
            {
              from: 0,
              duration: 60,
              src: "https://samplelib.com/lib/preview/mp3/sample-9s.mp3"
            },
            {
              from: 120,
              duration: 60,
              src: "https://samplelib.com/lib/preview/mp3/sample-12s.mp3"
            }
          ]
        }}
      />
    </RecodecProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
