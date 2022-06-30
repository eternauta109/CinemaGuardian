import React from "react";
import { MultiSelect } from "primereact/multiselect";

import { Button } from "primereact/button";

import { InputText } from "primereact/inputtext";

import { columns } from "./ColumnsData";
import { exportExcel } from "./exportExcel";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";

export const HeaderTable = ({
  globalFilterValue1,
  setGlobalFilterValue1,
  initFilters1,
  setFilters1,
  filters1,
  selectedColumns,
  setSelectedColumns,
  ultimateData
}) => {
  /* console.log("ultimatedata", ultimateData()); */

  const onColumnToggle = (event) => {
    /* console.log(event.value); */
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol) => sCol.field === col.field)
    );
    setSelectedColumns(orderedSelectedColumns);
  };

  const clearFilter1 = () => {
    initFilters1();
  };

  const onGlobalFilterChange1 = (e) => {
    const value = e.target.value;

    let _filters1 = { ...filters1 };
    /* console.log(_filters1); */
    _filters1["global"].value = value;

    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  };

  return (
    <div className="flex flex-column">
      <div className="flex justify-content-end">
        <div className="flex justify-content-between ml-2">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue1}
              onChange={onGlobalFilterChange1}
              placeholder="Keyword Search"
              style={{ width: "7em" }}
            />
          </span>
          <Button
            type="button"
            icon="pi pi-file-excel"
            onClick={() => exportExcel({ ultimateData })}
            className="p-button-success mr-2"
            data-pr-tooltip="XLS"
          />
        </div>
      </div>
      <div className="flex justify-content-end">
        <div className="flex justify-content-between ml-2">
          <MultiSelect
            value={selectedColumns}
            options={columns}
            optionLabel="header"
            onChange={onColumnToggle}
            style={{ width: "7em" }}
          />

          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            className="p-button-outlined"
            onClick={clearFilter1}
          />
        </div>
      </div>
    </div>
  );
};
