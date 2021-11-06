// const core = require("@actions/core");
// const github = require("@actions/github");
require("dotenv").config();
const { Octokit } = require("@octokit/rest"); // 개발 용도로 직접 사용

const MY_LIMITED_30DAYS_TOKEN = process.env.GITHUB_TOKEN;
const owner = "seongbin9786";
const repo = "check-participation";

async function run() {
  console.log("hi !");
  try {
    // This should be a token with access to your repository scoped in as a secret.
    // The YML workflow will need to set myToken with the GitHub Secret Token
    // myToken: ${{ secrets.GITHUB_TOKEN }}
    // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token#about-the-github_token-secret
    //const myToken = core.getInput("myToken");
    //const octokit = github.getOctokit(myToken);
    const octokit = new Octokit({
      auth: MY_LIMITED_30DAYS_TOKEN,
      userAgent: "participation logger agent v0.0.1",
      timeZone: "Asia/Seoul",
      baseUrl: "https://api.github.com",
    });

    const {
      data: [lastCommit],
    } = await octokit.rest.repos.listCommits({
      owner,
      repo,
    });
    const userName = lastCommit.author.login;
    // prints last commiter's username
    // 이 username을 Table의 '실명'으로 대응시키기 위해서는 영구적으로 저장되는 map이 필요할 것이다.
    // 이 파일은 {repo}/.attendance/usermap.txt 를 읽어 map을 구성하면 될듯하다.
    console.log(userName);

    const {
      data: { content },
    } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path: ".attendance/usermap.txt",
    });

    // base64 decode
    const result = Buffer.from(content, "base64").toString("utf8");
    console.log(result);
  } catch (error) {
    // core.setFailed(error.message);
    console.log(error);
  }
}

run();
