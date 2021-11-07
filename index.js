require("dotenv").config();
const core = require("@actions/core"); // fail 호출을 위해 필요하다.

//GITHUB_REPOSITORY와 GITHUB_ACTOR는 기본 제공되는 환경 변수이다.
// 이 값들도 with, env 둘 다 환경변수로 들어온다. with, env를 동시에 쓰면 문법 오류가 난다.
// env로 통일했다.
const token = process.env.GITHUB_TOKEN;
const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
const userName = process.env.GITHUB_ACTOR;
const addedFiles = process.env.ADDED_FILES || "";
const deletedFiles = process.env.DELETED_FILES || "";

const GitHubApiClient = require("./src/GitHubApiClient");
const GitHubServiceProxy = require("./src/GitHubServiceProxy");
const AttendanceDatabase = require("./src/AttendanceDatabase");
const UnitOfUpdate = require("./src/UnitOfUpdate");
const TableRenderer = require("./src/TableRenderer");

async function run(token, owner, repo, userName, addedFiles, deletedFiles) {
  try {
    const GitHubServiceProxy = await createGitHubServiceProxy();

    // Parallel로 호출하는 것이 좋을 것이다.
    // https://stackoverflow.com/questions/35612428/call-async-await-functions-in-parallel
    const userMap = await GitHubServiceProxy.getUserMap();
    const oldReadMeFile = await GitHubServiceProxy.getReadMeFile();
    const oldRecordsFile = await GitHubServiceProxy.getRecordsFile();

    const db = new AttendanceDatabase(userMap, oldRecordsFile);
    const unitOfUpdate = new UnitOfUpdate(userName, addedFiles, deletedFiles);
    db.update(unitOfUpdate);

    const tableRenderer = new TableRenderer(userMap, oldReadMeFile, 3);
    const updatedTable = tableRenderer.createUpdatedTable(db);

    GitHubServiceProxy.pushUpdatedTable(updatedTable);
  } catch (error) {
    core && core.setFailed(error.message);
    console.log(error);
  }
}

// GitHubServiceProxy 객체를 생성하기 위해선
// apiClient를 생성하고 비동기 반환값으로 초기화해야 하기 때문에
// 작업이 번거로우므로 따로 함수로 빼놓음.
async function createGitHubServiceProxy() {
  const apiClient = new GitHubApiClient(token, owner, repo, userName);
  await apiClient.fetchAndUpdateAuthorEmail(); // async constructor는 없는 걸까? 이상하겠지?
  return new GitHubServiceProxy(apiClient);
}

run(token, owner, repo, userName, addedFiles, deletedFiles);
