import { Fragment } from "react/jsx-runtime";
import { AudioSequence } from "../src";

interface CompositionProps {
  data: { from: number; duration: number; src: string }[];
}

export const Composition: React.FC<CompositionProps> = ({ data }) => {
  return (
    <Fragment>
      {data.map((props, i) => {
        return <AudioSequence key={i} {...props} />;
      })}
    </Fragment>
  );
};
