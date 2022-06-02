
// @actions/core
const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  const runDate = Date.now();

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
    }).data.tag_name;


    console.log("LATEST RELEASE", latestReleaseTag)

    const branchName = `${repo}-upgrade-${latestReleaseTag}-${runDate}`

    // pull from main and git checkout to a new branch with the name of Latest knit release


    // Run NPM update knit version
    // git add and commit
    // create a PR based on the commit
    // 

    console.log("RUN DATE", runDate)

    await exec.exec('git pull')
    await exec.exec(`git checkout -b ${branchName}`)
    await exec.exec(`touch example.txt`)
    await exec.exec(`git add . && git commit -m "Upgrade ${repo} to ${latestReleaseTag}"`);
    await exec.exec(`git push --set-upstream origin ${branchName}`);


  } catch (err) {
    core.setFailed(err.message);
  }
}

run();



// octokit.rest.repos.getLatestRelease({
//   owner,
//   repo,
// });