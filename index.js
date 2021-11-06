require("dotenv").config();
const core = require("@actions/core");

//GITHUB_REPOSITORY와 GITHUB_ACTOR는 기본 제공되는 환경 변수이다.
const token = process.env.GITHUB_TOKEN;
const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");
const userName = process.env.GITHUB_ACTOR;
const addedFiles = process.env.ADDED_FILES || "";
const deletedFiles = process.env.DELETED_FILES || "";

const GitHubApiClient = require("./src/GitHubApiClient");
const GitHubResources = require("./src/GitHubResources");
const TableRenderer = require("./src/TableRenderer");

async function run() {
  try {
    const client = new GitHubApiClient(token, owner, repo, userName);
    await client.fetchAndUpdateAuthorEmail();

    const resources = new GitHubResources(client);

    const userMap = await resources.getUserMap();
    const oldReadMeFile = await resources.getReadMeFile();

    const tableRenderer = new TableRenderer(userMap, oldReadMeFile);
    const updatedTable = tableRenderer.render(
      userName,
      addedFiles,
      deletedFiles
    );

    resources.updateAttendanceTable(updatedTable);
  } catch (error) {
    core && core.setFailed(error.message);
    console.log(error);
  }
}

run();
