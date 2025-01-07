import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import ffprobeInstaller from "@ffprobe-installer/ffprobe";
import {
  AudioCompositionItem,
  CompositionMetadata,
  CompositionState
} from "@recodec/core";
import ffmpeg from "fluent-ffmpeg";
import os from "os";
import path from "path";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobeInstaller.path);

export interface RenderCompositionProps {
  composition: CompositionState;
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
      break;
    case "mp3": {
      const items: AudioCompositionItem[] = [];
      for (const id in composition.items) {
        const item = composition.items[id];
        if (item.type === "audio") items.push(item);
      }

      console.log("items", items);

      const command = ffmpeg();
      for (const item of items) {
        command
          .input(item.data.src)
          .setStartTime(item.from / metadata.fps)
          .setDuration(item.duration / metadata.fps);
      }

      return new Promise((resolve, reject) => {
        const name = path.basename(output.file);
        const tmpFile = path.join(os.tmpdir(), `${Date.now()}-${name}`);
        const outputFile = path.join(process.cwd(), output.file);

        command
          .output(outputFile)
          .on("progress", progress => {
            console.log(`Processing ${name}`, progress);
          })
          .on("end", () => {
            console.log(`Finished processing ${name}`);
            resolve(outputFile);
          })
          .on("error", err => {
            console.error(`Error processing ${name}: ${err.message}`);
            reject(err);
          })
          .mergeToFile(tmpFile, os.tmpdir())
          .run();
      });
    }
  }
};
