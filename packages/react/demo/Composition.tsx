import { Fragment } from "react/jsx-runtime";
import { AudioSequence } from "../src";

interface CompositionProps {}

export const Composition: React.FC<CompositionProps> = () => {
  return (
    <Fragment>
      {/* 0 - 5 seconds */}
      <AudioSequence
        from={0}
        duration={150}
        src="https://samplelib.com/lib/preview/mp3/sample-9s.mp3"
      />
      {/* 5 - 10 seconds */}
      <AudioSequence
        from={150}
        duration={300}
        src="https://samplelib.com/lib/preview/mp3/sample-9s.mp3"
      />
    </Fragment>
  );
};
