#!/home/ubuntu/.nvm/versions/node/v17.8.0/bin/node

import express from "express";
import pkg from 'body-parser';
const { urlencoded, json } = pkg;
import { info, error, warn } from "./logger.js";
import { git_clone_fresh, copy_scripts, run_build_script, clean_up_dirs } from './functions.js';

const app = express();
const port = 8080;

// parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: false }));
// parse application/json
app.use(json());

// Log IP source of incoming message
const logger = (req, res, next) => {
  info(`Message received from ip: ${req.ip} `);
  next();
};

// Default
app.get("/", logger, (req, res, next) => {
  info(`Incoming default request, responding`);
  res.status(200).json({ message: "Hello, world!" });
});

// Testing POST endpoint - used to debug and print incoming messages
app.post("/test", logger, (req, res, next) => {
  info(`Incoming POST request on default, responding`);
  info(`body: \n ${JSON.stringify(req.body, null, 4)}`);
  res.status(200).json({ message: "received" });
});

/**
 * Listens for GitHub webhook triggers.
 *  
 * GitHub will send a webhook on any push event on the repository to this endpoint.
 * It will read the ref of that message body to check the branch.
 * If the branch is main, it will continue on to test and build the code.
 * If the branch is anything other than main, it will acknowledge the message and do nothing.
 */
app.post("/github", logger, (req, res, next) => {
  info(`Incoming GitHub hook!`);

  if (req.body.ref === "refs/heads/main") {
    res.status(200).json({ status: "beginning build", reason: "correct branch" });
    info("This is the right branch, proceeding..");

    // Initialize my return variables
    let clone_result, copy_result, script_result;

    // Clone repository
    clone_result = git_clone_fresh();

    // If it succeeded
    if (clone_result === 0) {
      // Copy build scripts and ENVs to clone dir
      copy_result = copy_scripts();

      // If copy succeeded
      if (copy_result === 0) {
        // Execute the build script
        script_result = run_build_script();
      }
    }

    // Delete the cloned dir
    clean_up_dirs();

    // If build script succeeded
    if (script_result === 0) {
      info("Build SUCCESS");
    } else {
      error("Build FAILED");
    }
  } else {
    warn(`Wrong branch: ${req.body.ref}`);
    res.status(200).json({ status: "skipped", reason: "not main branch" });
  }
});

// Invalid URL - default
app.all("*", (req, res) => {
  error(`Invalid request: ${req.url}`);
  res.status(404).json({ err: 404, description: "Invalid URL" });
});

// Start server on given port
app.listen(port, (err) => {
  if (err) {
    error(`Error ${e}`);
    return err;
  }
  info(`Server is running on port: ${port}`);
});
