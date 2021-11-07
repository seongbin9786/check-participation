class GitHubServiceProxy {
  constructor(
    client,
    userMapFilePath = ".attendance/usermap.txt",
    configFilePath = ".attendance/config.txt",
    readMeFilePath = "README.md",
    recordsFilePath = ".attendance/records.txt"
  ) {
    this.client = client;
    this.userMapFilePath = userMapFilePath;
    this.configFilePath = configFilePath;
    this.readMeFilePath = readMeFilePath;
    this.recordsFilePath = recordsFilePath;
  }

  // 공통 코드 재활용 목적
  async _getDecodedContentOfPath(path) {
    const {
      data: { content },
    } = await this.client.getContentOfPath(path);

    return Buffer.from(content, "base64").toString("utf8"); // base64 decode
  }

  async getUserMap() {
    const result = await this._getDecodedContentOfPath(this.userMapFilePath);
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

  async getConfigFile() {
    return await this._getDecodedContentOfPath(this.configFilePath);
  }

  async getReadMeFile() {
    return await this._getDecodedContentOfPath(this.readMeFilePath);
  }

  async getRecordsFile() {
    return await this._getDecodedContentOfPath(this.recordsFilePath);
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
