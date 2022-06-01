
// @actions/core
const github = require("@actions/github");

const runDate = Date.now();
async function run() {
  try {
    console.log('======================================');
    console.log('          Knit Updater!               ');
    console.log('======================================');

    const token = core.getInput("repo-token");

    const octokit = github.getOctokit(token);

    const newIssue = await octokit.rest.issues.create({
      repo: github.context.repo.repo,
      owner: github.context.repo.owner,
      title: issueTitle,
      body: jokeBody
    });

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