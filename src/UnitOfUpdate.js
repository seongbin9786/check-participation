class UnitOfUpdate {
  // es6 여도 js에선 여전히 필드를 public으로 접근할 수 있으므로,
  // es6 class로 정의해도 이전의 객체처럼 사용할 수 있다.
  constructor(userName, addedFiles, deletedFiles) {
    this.userName = userName;
    this.addedFiles = addedFiles;
    this.deletedFiles = deletedFiles;
  }
}

module.exports = UnitOfUpdate;
