import { RecodecProvider, Renderer } from "../src";
import { Composition } from "./Composition";

function Root() {
  return (
    <RecodecProvider metadata={{ width: 1920, height: 1080, fps: 30 }}>
      <Renderer Component={Composition} composition={{}} />
    </RecodecProvider>
  );
}

export default Root;
