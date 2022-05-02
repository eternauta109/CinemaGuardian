import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";

import React, { useState, useEffect } from "react";

import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";

import { InputText } from "primereact/inputtext";

import { Button } from "primereact/button";

import { MultiSelect } from "primereact/multiselect";

import { Column } from "primereact/column";

const HomeLists = () => {
  const [filters1, setFilters1] = useState(null);

  const [globalFilterValue1, setGlobalFilterValue1] = useState("");

  const cinemas = [
    { name: "nola", cinema: "nola" },
    { name: "parco" },
    { name: "guidonia" },
    { name: "vicenza" },
    { name: "limena" }
  ];

  const items = [
    { id: "nla-1", cinema: "nola" },
    { id: "prc-1", cinema: "parco" }
  ];

  useEffect(() => {
    /* dispatch(getItems({ cinemas })); */

    initFilters1();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const clearFilter1 = () => {
    initFilters1();
  };

  const onGlobalFilterChange1 = (e) => {
    const value = e.target.value;
    let _filters1 = { ...filters1 };
    _filters1["global"].value = value;

    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  };

  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },

      cinema: { value: null, matchMode: FilterMatchMode.IN }
    });
    setGlobalFilterValue1("");
  };

  const renderHeader1 = () => {
    return (
      <div className="flex justify-content-between">
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

  const representativeBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span className="image-text">{rowData.name}</span>
      </React.Fragment>
    );
  };

  const representativeFilterTemplate = (options) => {
    console.log("opt", options);
    return (
      <MultiSelect
        value={options.value}
        options={cinemas}
        itemTemplate={representativesItemTemplate}
        onChange={(e) => options.filterCallback(e.value)}
        placeholder="Any"
        className="p-column-filter"
      />
    );
  };

  const representativesItemTemplate = (option) => {
    console.log("opt cit", option);
    return (
      <div className="p-multiselect-representative-option">
        <span className="image-text">{option.name}</span>
      </div>
    );
  };

  const header1 = renderHeader1();

  return (
    <div className="datatable-filter-demo">
      <div className="card">
        <h5>Filter Menu</h5>
        <p>Filters are displayed in an overlay.</p>
        <DataTable
          value={items}
          paginator
          className="p-datatable-customers"
          showGridlines
          rows={10}
          dataKey="id"
          filters={filters1}
          filterDisplay="menu"
          responsiveLayout="scroll"
          globalFilterFields={["id", "cinema"]}
          header={header1}
          emptyMessage="No customers found."
        >
          <Column
            field="id"
            header="id"
            filter
            filterPlaceholder="Search by name"
            style={{ minWidth: "12rem" }}
          />

          <Column
            header="cinema"
            field="cinema"
            options={cinemas}
            sortable
            filterField="cinema"
            showFilterMatchModes={false}
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "14rem" }}
            body={representativeBodyTemplate}
            filter
            filterElement={representativeFilterTemplate}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default HomeLists;
