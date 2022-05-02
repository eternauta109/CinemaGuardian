const headerExcel = [
  "id",
  "cinema",
  "priority",
  "title",
  "areaCinema",
  "problem",
  "capex",
  "category",
  "competence",
  "stDate",
  "endDate",
  "dayWorks",
  "qutation",
  "orderCost",
  "finalCost",
  "inProgress",
  "approved",
  "closed"
];

export const exportExcel = ({ ultimateData }) => {
  let exportData = ultimateData();

  console.log("exportData", exportData);

  import("xlsx").then((xlsx) => {
    const worksheet = xlsx.utils.json_to_sheet(exportData, {
      header: headerExcel
    });
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer = xlsx.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });
    saveAsExcelFile(excelBuffer, "CinemaGuardians");
  });
};

const saveAsExcelFile = (buffer, fileName) => {
  import("file-saver").then((module) => {
    if (module && module.default) {
      let EXCEL_TYPE =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      let EXCEL_EXTENSION = ".xlsx";
      const data = new Blob([buffer], {
        type: EXCEL_TYPE
      });

      module.default.saveAs(
        data,
        fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
      );
    }
  });
};
