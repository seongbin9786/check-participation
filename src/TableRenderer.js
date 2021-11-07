class TableRenderer {
  constructor(userMap, db, tableHTML, fullyAttendedMinimum) {
    this.userMap = userMap;
    this.tableHTML = tableHTML;
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

  render() {
    throw new Error("Not implemented yet");
  }
}

module.exports = TableRenderer;
