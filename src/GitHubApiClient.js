const { Octokit } = require("@octokit/rest"); // 개발 용도로 직접 사용

class GitHubApiClient {
  constructor(token, owner, repo, authorName) {
    this.octokit = new Octokit({
      auth: token,
      userAgent: "participation logger agent v0.0.1",
      timeZone: "Asia/Seoul",
      baseUrl: "https://api.github.com",
    });
    this.owner = owner;
    this.repo = repo;
    this.authorName = authorName;
    this.authorEmail = null;
  }

  async fetchAndUpdateAuthorEmail() {
    const { data } = await this.octokit.rest.repos.listCommits({
      owner: this.owner,
      repo: this.repo,
    });

    for (let i = 0; i < data.length; i++) {
      if (this.authorName === data[i].author.login) {
        this.authorEmail = data[i].commit.author.email;
        return;
      }
    }
  }

  // README, userMap 가져오는데 사용됨.
  async getContentOfPath(path) {
    return await this.octokit.rest.repos.getContent({
      owner: this.owner,
      repo: this.repo,
      path,
    });
  }

  // 이거 진짜로 갱신된다...
  async commitUpdatedReadMe(sha, content) {
    if (!content) {
      // TODO: 여기서 throw했는데 왜 try-catch에 안 걸리고 UnhandledPromiseRejectionWarning이 뜰까?
      throw new Error("Empty README content! throwing error and exit.");
    }
    return await this.octokit.rest.repos.createOrUpdateFileContents({
      owner: this.owner,
      repo: this.repo,
      path: "README.md",
      sha,
      message: "Automatically updated attendance records",
      content: Buffer.from(content, "utf8").toString("base64"), //base64 인코딩 필요
      "committer.name": this.authorName,
      "committer.email": this.authorEmail,
      "author.name": this.authorName,
      "author.email": this.authorEmail,
    });
  }
}

module.exports = GitHubApiClient;
