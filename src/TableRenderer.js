class TableRenderer {
  constructor(userMap, readMeFile, fullyAttendedMinimum) {
    this.userMap = userMap;
    this.readMeFile = readMeFile;
    this.fullyAttendedMinimum = fullyAttendedMinimum || 3;
  }

  _renderColumns() {
    return `
      <tr>
        <th></th> <!-- 이 부분은 이름 영역이라 빈 column -->
        <th><strong>1 주차</strong></th>
        <th><strong>2 주차</strong></th>
      </tr>
    `;
  }

  _renderUserRow(userName, records) {
    const fullyAttended = `💯`;

    return `
    <tr>
      <td><strong>${userName}</strong></td>
      ${records.map(
        (num) => `<td>${num >= FULLY_ATTEND_MINIMUM ? fullyAttended : num}</td>`
      )}
    </tr>
    `;
  }

  createUpdatedTable(db) {
    return `
      <table>
        ${this._renderColumns()}
        ${this._renderUserRow(u)}
      </table>
    `;
  }
}

module.exports = TableRenderer;
