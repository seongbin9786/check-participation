const TableRenderer = require("./TableRenderer");

class ReadMeFileUpdater {
  constructor(userMap, readMeFile, db) {
    this.readMeFile = readMeFile;

    // readMe를 세 부분으로 분할한다.
    const [htmlBeforeTable, table, htmlAfterTable] =
      this._splitReadMeHTML(readMeFile);

    this.htmlBeforeTable = htmlBeforeTable;
    this.htmlAfterTable = htmlAfterTable;
    this.tableRenderer = new TableRenderer(
      userMap,
      table, // Markdown 중 Table만
      db
    );
  }

  _splitReadMeHTML(readMeFile) {
    const [htmlBeforeTable, afterTableOpener] =
      readMeFile.split('<table id="attendance">') ||
      readMeFile.split("<table id='attendance'>"); // id 표시가 single quote일 때를 대비한 코드.
    const [tableContent, htmlAfterTable] = afterTableOpener.split("</table>");

    return [htmlBeforeTable, `<table>${tableContent}</table>`, htmlAfterTable];
  }

  getUpdatedReadMe() {
    return (
      this.htmlBeforeTable + this.tableRenderer.render() + this.htmlAfterTable
    );
  }
}

module.exports = ReadMeFileUpdater;
