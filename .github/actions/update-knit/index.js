
// @actions/core
const core = require("@actions/core");
const github = require("@actions/github");

const runDate = Date.now();
async function run() {
  try {
    const repo = core.getInput("released_repo")
    const owner = core.getInput("owner")
    const token = core.getInput("repo-token");

    console.log('======================================');
    console.log(`       ${repo} Updater!               `);
    console.log('======================================');

    const octokit = github.getOctokit(token);

    const latestReleaseTag = await octokit.rest.repos.getLatestRelease({
      owner,
      repo,
    });

    console.log("LATEST RELEASE", latestReleaseTag)

    // Get latest Release from Knit
    // console.log the Release from Knit

    // pull from main and git checkout to a new branch with the name of Latest knit release


    // Run NPM update knit version
    // git add and commit
    // create a PR based on the commit
    // 

    console.log(runDate)

  } catch (err) {
    core.setFailed(err.message);
  }
}

run();



// octokit.rest.repos.getLatestRelease({
//   owner,
//   repo,
// });