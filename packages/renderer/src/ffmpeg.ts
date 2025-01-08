import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import ffprobeInstaller from "@ffprobe-installer/ffprobe";
import {
  AudioCompositionItem,
  CompositionMetadata,
  CompositionState
} from "@recodec/core";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs/promises";
import os from "os";
import path from "path";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);
ffmpeg.setFfprobePath(ffprobeInstaller.path);
const tmpDir = path.join(os.tmpdir(), "recodec");
fs.mkdir(tmpDir, { recursive: true });

export interface RenderCompositionProps {
  composition: CompositionState;
  metadata: CompositionMetadata;
  configuration: {
    codec: "mp3";
  };
  output: { file: string };
}

export const renderComposition = async (props: RenderCompositionProps) => {
  const { composition, configuration, metadata, output } = props;

  switch (configuration.codec) {
    case "mp3": {
      const totalDuration = composition.duration;
      const items: AudioCompositionItem[] = [
        {
          id: "silent-audio",
          type: "audio",
          from: 0,
          duration: totalDuration,
          data: { src: "anullsrc=channel_layout=stereo:sample_rate=44100" }
        }
      ];

      for (const id in composition.items) {
        const item = composition.items[id];
        if (item.type === "audio") items.push(item);
      }

      const promises = items.map((item, index) => {
        const filename = `output${index}.mp3`;
        const file = path.join(tmpDir, filename);

        return new Promise<{ file: string; item: AudioCompositionItem }>(
          (resolve, reject) => {
            const command = ffmpeg();
            if (item.id === "silent-audio") {
              command
                .input("anullsrc=channel_layout=5.1:sample_rate=48000")
                .inputFormat("lavfi")
                .inputOption(`-t ${item.duration / metadata.fps}`);
            } else {
              command
                .input(item.data.src)
                // .seekInput(item.from / metadata.fps) <- if has offsets
                // .setStartTime(item.from / metadata.fps)
                .setDuration(item.duration / metadata.fps);
            }
            command
              .output(file)
              .on("end", () => resolve({ file, item }))
              .on("error", err => reject(err))
              .run();
          }
        );
      });

      const files = await Promise.all(promises);

      return new Promise((resolve, reject) => {
        const name = path.basename(output.file);
        const outputFile = path.join(process.cwd(), output.file);

        const command = ffmpeg();
        for (const { file } of files) {
          command.input(file);
        }

        command
          .complexFilter(
            [
              ...files.map(({ item }, index) => {
                const delayInSeconds = item.from / metadata.fps;
                const delayInMilliseconds = delayInSeconds * 1000;

                return {
                  filter: "adelay",
                  options: {
                    delays: `${delayInMilliseconds}|${delayInMilliseconds}`
                  },
                  inputs: `${index}:a`,
                  outputs: `delayed:${index}:a`
                };
              }),
              {
                filter: "amix",
                options: {
                  inputs: files.length,
                  duration: "longest",
                  dropout_transition: 3
                },
                inputs: files.map((_, index) => `delayed:${index}:a`),
                outputs: "out"
              }
            ],
            ["out"]
          )
          .on("end", () => {
            console.log(`Finished processing ${name}`);
            resolve(outputFile);
          })
          .on("error", err => {
            console.error(`Error processing ${name}: ${err.message}`);
            reject(err);
          })
          .save(outputFile);
      });
    }
    default:
      throw new Error(`Unxpected codec: ${configuration.codec}`);
  }
};
