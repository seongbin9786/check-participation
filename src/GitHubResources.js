class GitHubApiClient {
  constructor(client, owner, repo) {
    this.client = client;
    this.owner = owner;
    this.repo = repo;
  }

  async getUserName() {
    const {
      data: [lastCommit],
    } = await this.client.getCommitsFromRepo(this.owner, this.repo);
    const userName = lastCommit.author.login;
    console.log(userName);
    return userName;
  }

  async getUserMap() {
    const {
      data: { content },
    } = await this.client.getContentFromRepo(this.owner, this.repo);

    // base64 decode
    const result = Buffer.from(content, "base64").toString("utf8");
    console.log(result);

    // string -> map
    const arr = result.split("\n");
    const userMap = {};
    arr.forEach((e) => {
      if (!e) return; // empty string도 여기 걸린다.
      const [username, realname] = e.split(" ");
      userMap[username] = realname;
    });
    console.log(userMap);
    return userMap;
  }
}

module.exports = GitHubApiClient;
