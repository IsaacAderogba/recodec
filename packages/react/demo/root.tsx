import { RecodecProvider, Renderer } from "../src";

function Root() {
  return (
    <RecodecProvider metadata={{ width: 1920, height: 1080, fps: 30 }}>
      <Renderer Component={Composition} composition={{}} />
    </RecodecProvider>
  );
}

interface CompositionProps {}

const Composition: React.FC<CompositionProps> = () => {
  return null;
};

export default Root;
