import { saveAs } from "file-saver";
import XlsxPopulate from "xlsx-populate";

export default function ToExcel(allData) {
  function getSheetData(data, header) {
    var fields = Object.keys(data[0]);
    console.log(fields);
    var sheetData = data.map(function (row) {
      return fields.map(function (fieldName) {
        return row[fieldName] ? row[fieldName] : "";
      });
    });
    sheetData.unshift(header);
    return sheetData;
  }

  async function saveAsExcel() {
    var data = [...allData];
    let header = [
      "item ref",
      "cinema",
      "title",
      "area",
      "category",
      "description",
      "status",
      "quatation",
      "order cost",
      "final cost"
    ];

    XlsxPopulate.fromBlankAsync().then(async (workbook) => {
      const sheet1 = workbook.sheet(0);
      const sheetData = getSheetData(data, header);
      const totalColumns = sheetData[0].length;
      console.log("total columns", totalColumns);

      sheet1.cell("A1").value(sheetData);
      const range = sheet1.usedRange();
      const endColumn = String.fromCharCode(64 + totalColumns);
      sheet1.row(1).style("bold", true);
      sheet1.range("A1:" + endColumn + "1").style("fill", "BFBFBF");
      range.style("border", true);
      return workbook.outputAsync().then((res) => {
        saveAs(res, "file.xlsx");
      });
    });
  }

  return saveAsExcel();
}
