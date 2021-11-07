/**
 * 책임:
 * 1. parse records.txt
 *  - config 파싱
 *  - records 파싱
 * 2. update itself and records.txt
 */
class AttendanceDatabase {
  constructor(userMap, configFile, recordsFile) {
    // 이걸로 알아서 초기화해야 함.
    // userMap이 필요할까?
    this.userMap = userMap;
    this.configFile = configFile;
    this.recordsFile = recordsFile;

    // 나중에 생성되는 필드
    this.fullyAttendedMinimum = null;
    this.firstSession = null;
    this.sessionName = null;
    this.sessionLength = null;
    this.curSession = null;
  }

  parseFiles() {
    this._parseConfigFile();
    this._parseRecordsFile();

    // firstSession은 config 값 중 하나이다.
    // parse 과정을 통해 config 값이 로딩됐으므로 curSession 값을 계산한다.
    const dateFirstSession = new Date(this.firstSession);
    const dateNow = new Date();
    const dayInMillisec = 1000 * 3600 * 24;
    const dayPassed = Math.ceil((dateNow - dateFirstSession) / dayInMillisec);
    // 예를 들어, beginAt="2021-11-06 17:00" 이면, diff = 1.006 정도로 나온다.
    // 즉 1이 넘는다. 하루 차이보다 더 난다는 뜻이다. => 다음 주차로 가는 게 맞다.
    // 따라서 ceil을 쓰는 게 맞다. floor를 쓴다면 23:59 차이까지 봐주는 것이다.

    this.curSession = Math.ceil(dayPassed / sessionLength) + 1;
  }

  // 몇 번째 주차를 업데이트할지를 받아와야 할 것 같은데용??^^
  update(unitOfUpdate) {
    const { userName, addedFiles, deletedFiles } = unitOfUpdate;

    // 반드시 parseFiles 이후 실행돼야 함.
    if (!this[userName]) throw new Error("update is called before load!");

    const diff = addedFiles.split(",").length - deletedFiles.split(",").length;

    // index에서 주차는 1-index 니까 1 빼줘야 함.
    this[userName][this.curSession - 1] += diff;
  }

  // returns string value
  getConfigValueOf(key) {
    return this[key];
  }

  // returns int array
  getUserRecordsBy(userName) {
    return this[userName];
  }

  getFullyAttendedMinimum() {
    return this.fullyAttendedMinimum;
  }

  _parseConfigFile() {
    const configItems = this.configFile.split("\n"); // "k=v" 형태의 배열
    configItems.forEach((line) => {
      const [k, v] = line.split("=");
      this[k] = v;
    });
  }

  _parseRecordsFile() {
    const linesOfRecords = this.recordsFile.split("\n"); // "k=v" 형태의 배열
    linesOfRecords.forEach((line) => {
      const [userName, stringArr] = line.split("=");

      const intArr = stringArr
        .split(",")
        .map((cntForEachSession) => Number(cntForEachSession));

      this[userName] = intArr;
    });
  }
}

module.exports = AttendanceDatabase;
