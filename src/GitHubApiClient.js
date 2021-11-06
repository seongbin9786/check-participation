// const github = require("@actions/github");
// octokit 객체도 github에서 얻어와야 함.
// const octokit = github.getOctokit(myToken);
const { Octokit } = require("@octokit/rest"); // 개발 용도로 직접 사용

class GitHubApiClient {
  constructor(token) {
    this.octokit = new Octokit({
      auth: token,
      userAgent: "participation logger agent v0.0.1",
      timeZone: "Asia/Seoul",
      baseUrl: "https://api.github.com",
    });
  }

  async getCommitsFromRepo(owner, repo) {
    // return이 붙어줘야 함.
    return await this.octokit.rest.repos.listCommits({ owner, repo });
  }

  async getContentFromRepo(owner, repo) {
    return await this.octokit.rest.repos.getContent({
      owner,
      repo,
      path: ".attendance/usermap.txt", // 나중에 설정되게 할까?
    });
  }
}

module.exports = GitHubApiClient;
