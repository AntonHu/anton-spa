#!/usr/bin/env node

import { Command } from "commander";
import { create } from "./commands/create";
import { createLogger } from "./utils/logger";

const logger = createLogger();
const program = new Command();

program
  .name("anton")
  .description("A modern CLI tool for creating React/Vue projects")
  .version("1.0.0");

program
  .command("create [name]")
  .description("create a new project")
  .action(async (name) => {
    try {
      await create(name);
    } catch (error) {
      logger.error("Failed to create project", error);
      process.exit(1);
    }
  });

program.parse();
