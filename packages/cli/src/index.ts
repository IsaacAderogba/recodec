#!/usr/bin/env node
import { program } from "commander";
import { chainBundleCommand } from "./commands/bundle";
import { chainRenderCommand } from "./commands/render";

program
  .name("@recodec/cli")
  .description("CLI to recodec server utilities")
  .version("1.0.0");

chainBundleCommand(program);
chainRenderCommand(program);

program.parse(process.argv);
