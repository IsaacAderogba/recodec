#!/usr/bin/env node
import { program } from "commander";

program
  .version("1.0.0")
  .description("Recoder Bundler")
  .option("-n, --name <type>", "Add your name")
  .action(options => {
    console.log(`Hey, ${options.name}!`, options);
  });

console.log("command line args", process.argv);
if (process.argv.length > 2) {
  console.log("cli mode");
  program.parse(process.argv);
} else {
  console.log("library mode");
}

export { foo } from "./lib";
