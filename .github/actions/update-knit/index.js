
const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("@actions/exec");

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

    const {
      data: { tag_name },
    } = await octokit.rest.repos.getLatestRelease({
      owner,
      repo,
    });

    const latestReleaseTag = tag_name

    console.log("LATEST RELEASE", latestReleaseTag)

    const branchName = `${repo}-upgrrade-${latestReleaseTag}-${runDate}`

    // pull from main and git checkout to a new branch with the name of Latest knit release


    // Run NPM update knit version
    // git add and commit
    // create a PR based on the commit
    // 

    console.log("RUN DATE", runDate)

    await exec.exec('git config --global user.email "christine.chois@stitchfix.com"')
    await exec.exec('git config --global user.name "chylauSF"')

    await exec.exec('git pull origin main')
    await exec.exec(`git checkout -b ${branchName}`)
    await exec.exec(`touch example.txt`)
    await exec.exec("git add .")
    await exec.exec(`git commit -m "Upgrade ${repo} to ${latestReleaseTag}"`)
    // await exec.exec(`git push --set-upstream origin ${branchName}`)

    octokit.rest.pulls.create({
      owner,
      repo,
      base: "main",
      head: `chylauSF:${branchName}`,
      title: "automated PR"
    });

  } catch (err) {
    core.setFailed(err.message);
  }
}

run();



// octokit.rest.repos.getLatestRelease({
//   owner,
//   repo,
// });