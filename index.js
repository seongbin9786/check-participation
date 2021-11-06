// const core = require("@actions/core");
// const github = require("@actions/github");
require("dotenv").config();

// 아래 값 전부 다 github에서 얻어와야 함.
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const owner = process.env.OWNER;
const repo = process.env.REPO;

const GitHubApiClient = require("./src/GitHubApiClient");
const GitHubResources = require("./src/GitHubResources");

async function run() {
  try {
    const client = new GitHubApiClient(GITHUB_TOKEN);
    const resources = new GitHubResources(client, owner, repo);
    const userName = await resources.getUserName();
    const userMap = await resources.getUserMap();
  } catch (error) {
    // core.setFailed(error.message);
    console.log(error);
  }
}

run();
