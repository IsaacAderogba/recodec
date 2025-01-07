import { RecodecProvider, Renderer } from "../src";

function Root() {
  return (
    <RecodecProvider>
      <Renderer
        Component={Composition}
        composition={{
          metadata: {
            width: 1920,
            height: 1080,
            durationInFrames: 150,
            fps: 30
          },
          props: {}
        }}
      />
    </RecodecProvider>
  );
}

interface CompositionProps {}

const Composition: React.FC<CompositionProps> = () => {
  return null;
};

export default Root;
