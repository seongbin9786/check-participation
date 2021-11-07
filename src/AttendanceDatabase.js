class AttendanceDatabase {
  constructor(userMap, oldRecordsFile) {
    // 이걸로 알아서 초기화해야 함.
    // userMap이 필요할까?
    this.userMap = userMap;
    this.fileContent = oldRecordsFile;
  }

  update(unitOfUpdate) {}
}

module.exports = AttendanceDatabase;
