import { Fragment } from "react/jsx-runtime";
import { AudioSequence } from "../src";

interface CompositionProps {}

export const Composition: React.FC<CompositionProps> = () => {
  return (
    <Fragment>
      {/* 0 - 2 seconds */}
      <AudioSequence
        from={0}
        duration={60}
        src="https://samplelib.com/lib/preview/mp3/sample-9s.mp3"
      />
      {/* 4 - 6 seconds */}
      <AudioSequence
        from={120}
        duration={60}
        src="https://samplelib.com/lib/preview/mp3/sample-12s.mp3"
      />
    </Fragment>
  );
};
