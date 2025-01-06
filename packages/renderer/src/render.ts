export interface RenderProps {
  input: {
    file: string;
  };
  composition: {
    codec: "h264" | "mp3";
    props: Record<string, any>;
  };
  output: {
    file: string;
  };
}

export const render = async (props: RenderProps) => {};
