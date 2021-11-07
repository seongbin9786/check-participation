class GitHubServiceProxy {
  constructor(client, userMapFilePath, readMeFilePath, recordsFilePath) {
    this.client = client;
    this.userMapFilePath = userMapFilePath || ".attendance/usermap.txt";
    this.readMeFilePath = readMeFilePath || "README.md";
    this.recordsFilePath = recordsFilePath || ".attendance/records.txt";
  }

  async getUserMap() {
    const {
      data: { content },
    } = await this.client.getContentOfPath(this.userMapFilePath);

    // base64 decode
    const result = Buffer.from(content, "base64").toString("utf8");
    console.log("decoded content:", result);

    // string -> map
    const arr = result.split("\n");
    const userMap = {};
    arr.forEach((e) => {
      if (!e) return; // empty string도 여기 걸린다.
      const [username, realname] = e.split(" ");
      userMap[username] = realname;
    });
    console.log("userMap:", userMap);
    return userMap;
  }

  async getReadMeFile() {
    const {
      data: { content },
    } = await this.client.getContentOfPath(this.readMeFilePath);
    // base64 decode
    return Buffer.from(content, "base64").toString("utf8");
  }

  async getRecordsFile() {
    const {
      data: { content },
    } = await this.client.getContentOfPath(this.recordsFilePath);
    // base64 decode
    return Buffer.from(content, "base64").toString("utf8");
  }

  async pushUpdatedReadMe(updatedReadMe) {
    // API로 파일 변경 commit 수행 시 이전 파일의 sha가 필요하기 때문에 sha를 먼저 구해옴.
    const {
      data: { sha },
    } = await this.client.getContentOfPath(this.readMeFilePath);

    await this.client.commitUpdatedReadMe(sha, updatedReadMe);
  }
}

module.exports = GitHubServiceProxy;
