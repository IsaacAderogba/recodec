import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import { CompositionMetadata, CompositionProps } from "@recodec/core";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export interface RenderCompositionProps {
  composition: CompositionProps;
  metadata: CompositionMetadata;
  configuration: {
    codec: "h264" | "mp3";
  };
  output: { file: string };
}

export const renderComposition = async (props: RenderCompositionProps) => {
  const { composition, configuration, metadata, output } = props;

  switch (configuration.codec) {
    case "h264":
      console.log("render mp4");
      return;
    case "mp3":
      console.log("render mp3");
      return;
  }
};
