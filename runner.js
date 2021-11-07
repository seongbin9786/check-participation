const core = require("@actions/core"); // fail 호출을 위해 필요하다.

const GitHubApiClient = require("./src/GitHubApiClient");
const GitHubServiceProxy = require("./src/GitHubServiceProxy");
const AttendanceDatabase = require("./src/AttendanceDatabase");
const UnitOfUpdate = require("./src/UnitOfUpdate");
const ReadMeFileUpdater = require("./src/ReadMeFileUpdater");

async function run(token, owner, repo, userName, addedFiles, deletedFiles) {
  try {
    const GitHubServiceProxy = await _createGitHubServiceProxy(
      token,
      owner,
      repo,
      userName
    );

    // Parallel로 호출하는 것이 좋을 것이다.
    // https://stackoverflow.com/questions/35612428/call-async-await-functions-in-parallel
    const userMap = await GitHubServiceProxy.getUserMap();
    const oldReadMeFile = await GitHubServiceProxy.getReadMeFile();
    const oldRecordsFile = await GitHubServiceProxy.getRecordsFile();

    const db = new AttendanceDatabase(userMap, oldRecordsFile);
    const unitOfUpdate = new UnitOfUpdate(userName, addedFiles, deletedFiles);
    db.update(unitOfUpdate);

    const updater = new ReadMeFileUpdater(userMap, db, oldReadMeFile);
    const updatedReadMe = updater.getUpdatedReadMe();

    GitHubServiceProxy.pushUpdatedReadMe(updatedReadMe);
  } catch (error) {
    core && core.setFailed(error.message);
    console.log(error);
  }
}

// GitHubServiceProxy 객체를 생성하기 위해선
// apiClient를 생성하고 비동기 반환값으로 초기화해야 하기 때문에
// 작업이 번거로우므로 따로 함수로 빼놓음.
async function _createGitHubServiceProxy(token, owner, repo, userName) {
  const apiClient = new GitHubApiClient(token, owner, repo, userName);
  await apiClient.fetchAndUpdateAuthorEmail(); // async constructor는 없는 걸까? 이상하겠지?
  return new GitHubServiceProxy(apiClient);
}

module.exports = run;
