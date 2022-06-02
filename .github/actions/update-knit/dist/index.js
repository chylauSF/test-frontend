/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 60:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 244:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

// @actions/core
const core = __nccwpck_require__(60);
const github = __nccwpck_require__(244);

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
    }).data.tag_name;

    const latestReleaseTag = tag_name

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
})();

module.exports = __webpack_exports__;
/******/ })()
;