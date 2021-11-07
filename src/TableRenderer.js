/*
이전 상태가 두 가지이기 때문이어서 구현이 어려운 컴포넌트이다.

1. 깨끗한 레포에서 모든 설정이 마쳐진 후 시작한 경우

2. 이미 작업이 어느 정도 진행된 후 이 workflow를 사용하는 경우
-> 이 부분은 미리 업데이트를 해줘야 할 것 같다.
-> 아니면 귀찮다.....흠..... 어차피 일단 나만 쓸 거면 수동 설정은 알아서 하라고 하고,
   나중에 update하는 방식을 처음부터 재귀로 탐색하는 방법으로 전환하는 것도 고려해볼만한듯. (이게 될 진 모르겠음. commiter를 모르니까)
   그러면 더 귀찮을 것 같아서 그냥 지금 방식으로 채택하자.
*/
class TableRenderer {
  constructor(userMap, tableHTML, db) {
    this.userMap = userMap;
    this.tableHTML = tableHTML;
    this.db = db;
    this.fullyAttendedMinimum = db.getConfigValueOf("fullyAttendedMinimum");
    this.curSession = db.getConfigValueOf("curSession");
    this.sessionName = db.getConfigValueOf("sessionName");
  }

  _renderColumns() {
    return `
      <tr>
        <th></th> <!-- 이 부분은 이름 영역이라 빈 column -->
        ${[...Array(this.curSession)].map(
          // i는 0-index이므로, Week 1부터 출력하기 위해 i+1
          (_, i) => `<th><strong>${this.sessionName} ${i + 1}</strong></th>`
        )}
      </tr>`
      .replaceAll(",", "") // map을 썼기 때문에 배열이며 String으로 변환 시 , 가 붙으므로 제거
      .replaceAll("\n", "")
      .trim();
  }

  /**
   * 각 사용자에 대한 record를 테이블의 행으로 출력해야 한다.
   *
   * 이 메소드 입장에서 쉽게 렌더링할 수 있도록 records를 그대로 출력할 수 있게만 해도 충분할 것 같다.
   */
  _renderUserRow(realName, userRecords) {
    const fullyAttended = `💯`;

    return `
      <tr>
        <td><strong>${realName}</strong></td>
        ${userRecords.map(
          (num) =>
            `<td>${
              num >= this.fullyAttendedMinimum
                ? fullyAttended
                : `${num}/${this.fullyAttendedMinimum}`
            }</td>`
        )}
      </tr>
    `
      .replaceAll(",", "") // map을 썼기 때문에 배열이며 String으로 변환 시 , 가 붙으므로 제거
      .replaceAll("\n", "")
      .trim();
  }

  render() {
    let table = '<table id="attendance">';
    table += this._renderColumns();
    Object.keys(this.userMap).forEach((userName) => {
      const realName = this.userMap[userName];
      table += this._renderUserRow(
        realName,
        this.db.getUserRecordsBy(userName)
      );
    });
    table += "</table>";
    console.log(table);
    // return table;
    throw new Error("stop!");
  }
}

module.exports = TableRenderer;
