import React, { useState, useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getItems } from "../slice/itemSlice";
import { useNavigate } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { Column } from "primereact/column";
import { Tooltip } from "primereact/tooltip";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { InputText } from "primereact/inputtext";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";

const Listsprime = () => {
  const items = useSelector((state) => state.items);
  /* const cinemas = useSelector((state) => state.cinemas); */
  const cinemas = [
    { name: "nola" },
    { name: "parco" },
    { name: "guidonia" },
    { name: "vicenza" },
    { name: "limena" }
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters1, setFilters1] = useState(null);
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");

  const dt = useRef(null);

  //EXCEL EXPORT

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

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(selectedItems, {
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

  //FILTER

  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      id: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
      },
      cinema: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
      },
      priority: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.CONTAINS }]
      }
    });
    setGlobalFilterValue1("");
  };

  const clearFilter1 = () => {
    initFilters1();
  };

  const onGlobalFilterChange1 = (e) => {
    const value = e.target.value;

    let _filters1 = { ...filters1 };
    console.log(_filters1);
    _filters1["global"].value = value;

    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  };

  const renderHeader1 = () => {
    return (
      <div className="flex justify-content-between">
        <div className="flex align-items-center export-buttons">
          <Button
            type="button"
            icon="pi pi-file-excel"
            onClick={exportExcel}
            className="p-button-success mr-2"
            data-pr-tooltip="XLS"
          />
        </div>
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          className="p-button-outlined"
          onClick={clearFilter1}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue1}
            onChange={onGlobalFilterChange1}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const header1 = renderHeader1();

  useEffect(() => {
    dispatch(getItems({ cinemas }));
    initFilters1();
  }, []);

  //TEMPLATE

  const problemTemplate = (rowData) => {
    /* console.log("rowdata", rowData); */
    return (
      <div class="flex align-items-center justify-content-center h-4rem font-bold text-white border-round m-2">
        <Button tooltip={rowData.problem}>
          <i class="pi pi-book" tooltip="Enter your username" />
        </Button>
      </div>
    );
  };

  //FOOTER

  const formatCurrency = (value) => {
    return value.toLocaleString("it-IT", {
      style: "currency",
      currency: "EUR"
    });
  };

  const quotationTotal = () => {
    let total = 0;
    let itemSelect = filteredData.length > 0 ? filteredData : items;

    for (let item of itemSelect) {
      total += item.quotation;
    }

    return formatCurrency(total);
  };

  let footerGroup = (
    <ColumnGroup>
      <Row>
        <Column
          footer="Totals:"
          colSpan={13}
          footerStyle={{ textAlign: "right" }}
        />
        <Column footer={quotationTotal} />
        {/* <Column footer={orderCostTotal} />
        <Column footer={finalCostTotal} /> */}
      </Row>
    </ColumnGroup>
  );

  return (
    <div>
      <Tooltip target=".export-buttons>button" position="bottom" />
      <div className="card">
        <DataTable
          ref={dt}
          showGridlines
          paginator
          resizableColumns
          columnResizeMode="expand"
          rows={5}
          filterDisplay="menu"
          globalFilterFields={["cinema", "priority"]}
          header={header1}
          emptyMessage="No customers found."
          filters={filters1}
          dataKey="id"
          footerColumnGroup={footerGroup}
          value={items}
          onValueChange={(e) => setFilteredData(e)}
          selectionMode="checkbox"
          responsiveLayout="scroll"
          selection={selectedItems}
          onSelectionChange={(e) => setSelectedItems(e.value)}
        >
          <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />
          <Column header="id" field="id" sortable filter align="center" />
          <Column header="cinema" field="cinema" sortable filter />
          <Column
            header="priority"
            field="priority"
            sortable
            filter
            align="center"
          />
          <Column header="title" field="title" sortable filter />
          <Column
            header="Cinema area"
            field="areaCinema"
            filter
            sortable
            filterPlaceholder="Search by name"
            style={{ minWidth: "12rem" }}
          />
          <Column
            header="problem"
            field="problem"
            body={problemTemplate}
            tooltipOptions={{ className: "blue-tooltip", position: "top" }}
            sortable
            filter
            style={{ maxWidth: "10rem" }}
          />
          <Column header="capex" field="capex" sortable filter />
          <Column header="category" field="category" sortable filter />
          <Column
            header="competence"
            field="competence"
            filter
            sortable
            filterPlaceholder="Search by name"
            style={{ minWidth: "12rem" }}
          />
          <Column header="start" field="stDate" sortable filter />
          <Column header="end" field="endDate" sortable filter />
          <Column header="Work Days" field="dayWorks" sortable filter />
          <Column header="qutation" field="quotation" sortable filter />
          <Column header="Order Cost" field="orderCost" sortable filter />
          <Column header="final cost" field="finalCost" sortable filter />
        </DataTable>
      </div>
    </div>
  );
};

export default Listsprime;
