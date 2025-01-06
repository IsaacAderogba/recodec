import { Renderer } from "../src";

interface Props {
  foo: string;
}

const Root: React.FC<Props> = props => {
  console.log("renderer props", props);

  return (
    <Renderer
      Composition={Composition}
      compositionProps={props}
      metadata={{ width: 1920, height: 1080, fps: 30, durationInFrames: 150 }}
    />
  );
};

const Composition: React.FC<Props> = () => {
  return null;
};

export default Root;
