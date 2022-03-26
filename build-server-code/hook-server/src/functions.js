import shell from 'shelljs';
import { error, warn, info } from './logger.js'

const root_dir = `/home/${process.env.USER}/hook-server`;
const git_url = 'https://github.com/DryDish/assignment-tests-mandatory.git';

/**
 * Clones the GitHub repository to a folder named `git` in the project root 
 * 
 * @returns {number} The return code of the operation
 */
function git_clone_fresh() {
  info(`Cloning repository...`);

  // Make the git folder, if it does not exist
  shell.mkdir("-p", `${root_dir}/git`);

  // Enter it
  shell.cd(`${root_dir}/git`);

  // Begin cloning
  const exec_result = shell.exec(`git clone ${git_url}`);

  if (exec_result.code === 0) {
    info('Clone was successful');
    return 0;
  } else {
    error('Clone failed!');
    error(`exec return code: ${exec_result.code}`);
    return 1;
  }
}


/**
 * Copies the local scripts to the cloned repository
 * 
 * @returns {number} The return code of the operation
 */
function copy_scripts() {
  info("Copying scripts folder to clone dir...");

  // Enter root directory
  shell.cd(`${root_dir}`);

  // Copy the scripts folder from the root directory to the repository directory
  const result = shell.cp('-rf', 'scripts/', `${root_dir}/git/assignment-tests-mandatory`);

  if (result.code === 0) {
    info("Copy was successful");
    return 0
  } else {
    error("Failed to copy scripts folder!");
    return 1
  }
}

/**
 * Executes the build script stored in the `scripts` folder
 * 
 * @returns {number} The return code of the operation
 */
function run_build_script() {
  shell.cd(`${root_dir}/git/assignment-tests-mandatory`);
  const result = shell.exec(`${root_dir}/git/assignment-tests-mandatory/scripts/build_script_with_logs.sh`);

  if (result.code === 0) {
    info("Build script ran successfully, images updated.");
    return 0;
  } else if (result.code === 1) {
    warn("Build action failed! Tests did not pass!");
    return 1;
  } else if (result.code === 2) {
    warn("Build action failed! Login to DockerHub failed!");
    return 2;
  } else if (result.code === 3) {
    warn("Build action failed! Images failed to upload!");
    return 3;
  } else {
    error(`Unknown error occurred: Error code: ${result.code}`);
    return result.code;
  }
}


/**
 * Removes the pulled repository from the `git` folder 
 * 
 * @returns {number} The return code of the operation
 */
function clean_up_dirs() {
  shell.cd(root_dir)
  const rm_status = shell.rm('-rf', `${root_dir}/git/assignment-tests-mandatory`)

  if (rm_status.code === 0) {
    info("Cleaned up git directory");
    return 0;
  } else {
    warn("Cleaning up directory failed!");
    return 1;
  }
}

export {
  git_clone_fresh,
  copy_scripts,
  run_build_script,
  clean_up_dirs
}

