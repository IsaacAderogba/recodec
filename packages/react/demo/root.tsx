import { Renderer } from "../src";

function Root() {
  return <Renderer Component={Composition} />;
}

interface CompositionProps {
  foo: string;
}

const Composition: React.FC<CompositionProps> = () => {
  return null;
};

export default Root;
