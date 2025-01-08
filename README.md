# Recodec

Recodec is a simple framework for creating audio programmatically with React. I created this for educational purposes to learn more about the inner workings of [Remotion](https://github.com/remotion-dev/remotion). As a result, it's not useful for production, but it should help convey the overall structure of how Remotion works.

## Get started

From the root of the project, run:

```sh
yarn
```

## Libraries

The project is broken up into 5 libraries that work together:

- `@recodec/core`: defines the core types that convey how Recodec structures data internally.
- `@recodec/react`: provides a small set of components for declaratively creating audio projects.
- `@recodec/bundler`: bundles a root Recodec file for faster rendering.
- `@recodec/renderer`: renders a root Recodec file using `ffmpeg`.
- `@recodec/cli`: exposes a `bundle` and `render` command for using Recodec via CLI.

## Example

This example should help you understand the workflow:

### 1. Create a composition

A Composition is the template that Recodec will use when rendering your project. It is simply a composition of React components:

```tsx
import { AudioSequence } from "@recodec/react";
import { Fragment } from "react/jsx-runtime";

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
```

The above simply declares that the `data` taken as input will be used to create an unspecified amount of `AudioSequence` components.

From the root of a custom React project, we can then supply this composition with example data and wrap it in a `RecodecProvider`:

```tsx
import { Player, RecodecProvider } from "@recodec/react";
import { createRoot } from "react-dom/client";
import { Composition } from "./Composition";

const App: React.FC = () => {
  return (
    <RecodecProvider metadata={{ fps: 30, width: 1920, height: 1080 }}>
      <Player
        Component={Composition}
        composition={{
          data: [
            {
              from: 0,
              duration: 60,
              src: "https://samplelib.com/lib/preview/mp3/sample-9s.mp3"
            },
            {
              from: 120,
              duration: 60,
              src: "https://samplelib.com/lib/preview/mp3/sample-12s.mp3"
            }
          ]
        }}
      />
    </RecodecProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
```

This will render an audio player that is 6 seconds long, with the first and last 2 seconds playing audio. Please note that `width` and `height` properties are only relevant when rendering video (which is not implemented, but would be similar to the `AudioSequence` implementation).

### 2. Bundle the composition

Next, we'll define a separate file that will be the entry point for bundling a composition:

```tsx
import { RecodecProvider, Renderer } from "@recodec/react";
import { Composition } from "./Composition";

function Root() {
  return (
    <RecodecProvider metadata={{ width: 1920, height: 1080, fps: 30 }}>
      <Renderer Component={Composition} composition={{ data: [] }} />
    </RecodecProvider>
  );
}

export default Root;
```

We pass an empty array as the `data` for now. During rendering, the `Renderer` component will retrieve the `data` that you've supplied at render time (more on this later). This allows the Composition to be treated as a template.

To bundle this file, you'll first need to link `@recodec/cli` globally by running the following from within the `cli` directory:

```
npm run link
```

or

```
yarn link
```

Once linked, you can execute the `recodec` binary globally and instruct it to bundle the `root.tsx` file:

```sh
recodec bundle ./root.tsx --output-dir=example-bundle
```

You can also do this programmatically with:

```ts
import { bundle } from "@recodec/bundler";

bundle({ entry: "./root.tsx", output: { dir: "./example-bundle" } });
```

### 3. Render the composition

Next, run the following command to render the composition:

```
recodec render ./example-bundle/index.html --fps 30 --width 1920 --height 1080 --codec mp3 --output-file ./example-bundle/output.mp3 --props '{"data":[{"from":0,"duration":60,"src":"https://samplelib.com/lib/preview/mp3/sample-9s.mp3"},{"from":120,"duration":60,"src":"https://samplelib.com/lib/preview/mp3/sample-12s.mp3"}]}'
```

You could also do this programmtically with:

```ts
import { render } from "@recodec/renderer";

render({
  entry: "./example-bundle/index.html",
  composition: {
    data: [
      {
        from: 0,
        duration: 60,
        src: "https://samplelib.com/lib/preview/mp3/sample-9s.mp3"
      },
      {
        from: 120,
        duration: 60,
        src: "https://samplelib.com/lib/preview/mp3/sample-12s.mp3"
      }
    ]
  },
  configuration: { codec: "mp3" },
  metadata: { fps: 30, width: 1920, height: 1080 },
  output: { file: "./example-bundle/output.mp3" }
});
```

Under the hood, Recodec will spin up a browser instance that will load your bundled Composition project and supply it with the `data` that you passed through at render time. Once Recodec has built up an internal representation of your project at this step, it will then send that internal representation to `ffmpeg` which will handle stitching the audio files together into a single MP3 output!

## Next steps

Obviously, [Remotion](https://github.com/remotion-dev/remotion) is much more complex than this and has a lot of missing pieces, so I definitely recommend checking out the project.

Additionally, the [WebCodecs API](https://developer.mozilla.org/en-US/docs/Web/API/WebCodecs_API) is improving really quickly and will likely reach a point where it can handle most ffmpeg use cases.
