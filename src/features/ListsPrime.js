import React, { useState, useEffect, useRef, useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getItems } from "../slice/itemSlice";
import { useNavigate, useLocation } from "react-router-dom";

//primeReact
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { Tooltip } from "primereact/tooltip";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { MultiSelect } from "primereact/multiselect";
import { HeaderTable } from "./datatable/HeaderTable";
import { columns } from "./datatable/ColumnsData";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { Calendar } from "primereact/calendar";

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";

//internal import
import Charts from "../components/Charts";
import FooterSection from "./datatable/FooterSection";
import { priority, areaSelect, capex, categoryList } from "../config/struttura";

//FUNCTION

const Listsprime = () => {
  /*  const items = useSelector((state) => state.items); */

  const cinemas = useSelector((state) => state.cinemas);

  /*  console.log("items in listprim", items); */
  console.log("cinema in listprim", cinemas);

  /*  const cinemas = [
    { name: "nola" },
    { name: "parco" },
    { name: "guidonia" },
    { name: "vicenza" },
    { name: "limena" }
  ]; */

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dt = useRef(null);
  const [itemsForTable, setItemsForTable] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters1, setFilters1] = useState(null);
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [selectedColumns, setSelectedColumns] = useState(columns);

  //FILTER

  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      id: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
      },
      cinema: {
        value: null,
        matchMode: FilterMatchMode.IN
      },
      priority: {
        value: null,
        matchMode: FilterMatchMode.IN
      },
      area: {
        value: null,
        matchMode: FilterMatchMode.IN
      },
      title: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
      },
      cinemaArea: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
      },
      problem: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
      },
      capex: {
        value: null,
        matchMode: FilterMatchMode.IN
      },
      category: {
        value: null,
        matchMode: FilterMatchMode.IN
      },
      competence: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }]
      },
      inProgress: { value: null, matchMode: FilterMatchMode.EQUALS },
      approved: { value: null, matchMode: FilterMatchMode.EQUALS },
      closed: { value: null, matchMode: FilterMatchMode.EQUALS },
      endDate: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
      },
      stDate: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }]
      }
    });
    setGlobalFilterValue1("");
    setFilteredData([]);
  };

  //----------------------------TEMPLATE--------------------------

  //PROBLEM

  const problemTemplate = (rowData) => {
    /* console.log("rowdata", rowData); */
    return (
      <div className="flex align-items-center justify-content-center h-1rem font-bold text-white border-round m-1">
        <Button tooltip={rowData.problem}>
          <i className="pi pi-book" />
        </Button>
      </div>
    );
  };

  //PRIORITY

  const priorityBodyTemplate = (params) => {
    /* console.log("cinemabody row data", rowData); */
    const priorityValue = params.priority;
    /*  console.log("cinemabody row data", priorityValue); */
    switch (priorityValue) {
      case "P1":
        return (
          <div
            style={{
              textAlign: "center",
              backgroundColor: "red",
              color: "white",
              borderRadius: "10px"
            }}
          >
            {" "}
            {priorityValue}
          </div>
        );
      case "P2":
        return (
          <div
            style={{
              textAlign: "center",
              backgroundColor: "orange",
              color: "white",
              borderRadius: "10px"
            }}
          >
            {" "}
            {priorityValue}
          </div>
        );
      case "P3":
        return (
          <div
            style={{
              textAlign: "center",
              backgroundColor: "grey",
              color: "white",
              borderRadius: "10px"
            }}
          >
            {" "}
            {priorityValue}
          </div>
        );

      default:
        return (
          <div
            style={{
              textAlign: "center",
              backgroundColor: "green",
              color: "white",
              borderRadius: "10px"
            }}
          >
            {" "}
            {priorityValue}
          </div>
        );
    }
  };

  const priorityFilterTemplate = (options) => {
    /* console.log("opt cft", options.value); */
    return (
      <MultiSelect
        value={options.value}
        filter
        options={priority}
        itemTemplate={priorityItemTemplate}
        onChange={(e) => {
          options.filterApplyCallback(e.value);
        }}
        optionLabel="name"
        placeholder="Any"
      />
    );
  };

  const priorityItemTemplate = (option) => {
    /* console.log("opt cit", option); */
    return <span className="image-text">{option}</span>;
  };

  //CINEMA

  const cinemaBodyTemplate = (rowData) => {
    /* console.log("cinemabody row data", rowData); */
    return <span className="image-text">{rowData.cinema}</span>;
  };

  const cinemaFilterTemplate = (options) => {
    return (
      <MultiSelect
        value={options.value}
        filter
        options={cinemas.map((e) => {
          return e.name;
        })}
        itemTemplate={cinemaItemTemplate}
        onChange={(e) => {
          options.filterApplyCallback(e.value);
        }}
        optionLabel="name"
        placeholder="Any"
      />
    );
  };

  const cinemaItemTemplate = (option) => {
    /* console.log("opt cit", option); */
    return (
      <div className="p-multiselect-representative-option">
        <span className="image-text">{option}</span>
      </div>
    );
  };

  //AREA

  const areaBodyTemplate = (rowData) => {
    /* console.log("cinemabody row data", rowData); */
    return <span className="image-text">{rowData.area}</span>;
  };

  const areaFilterTemplate = (options) => {
    return (
      <MultiSelect
        value={options.value}
        filter
        options={areaSelect}
        itemTemplate={areaItemTemplate}
        onChange={(e) => {
          options.filterApplyCallback(e.value);
        }}
        optionLabel="name"
        placeholder="Any"
      />
    );
  };

  const areaItemTemplate = (option) => {
    /* console.log("opt cit", option); */
    return (
      <div className="p-multiselect-representative-option">
        <span className="image-text">{option}</span>
      </div>
    );
  };

  //CAPEX

  const capexBodyTemplate = (rowData) => {
    /* console.log("cinemabody row data", rowData); */
    return <span className="image-text">{rowData.capex}</span>;
  };

  const capexFilterTemplate = (options) => {
    return (
      <MultiSelect
        value={options.value}
        filter
        options={capex}
        itemTemplate={capexItemTemplate}
        onChange={(e) => {
          options.filterApplyCallback(e.value);
        }}
        optionLabel="name"
        placeholder="Any"
      />
    );
  };

  const capexItemTemplate = (option) => {
    /* console.log("opt cit", option); */
    return (
      <div className="p-multiselect-representative-option">
        <span className="image-text">{option}</span>
      </div>
    );
  };

  //CATEGORY

  const categoryBodyTemplate = (rowData) => {
    /* console.log("cinemabody row data", rowData); */
    return <span className="image-text">{rowData.category}</span>;
  };

  const categoryFilterTemplate = (options) => {
    return (
      <MultiSelect
        value={options.value}
        filter
        options={categoryList}
        itemTemplate={categoryItemTemplate}
        onChange={(e) => {
          options.filterApplyCallback(e.value);
        }}
        optionLabel="name"
        placeholder="Any"
      />
    );
  };

  const categoryItemTemplate = (option) => {
    /* console.log("opt cit", option); */
    return (
      <div className="p-multiselect-representative-option">
        <span className="image-text">{option}</span>
      </div>
    );
  };

  //PHOTOS & LINKS

  const photosBodyTemplate = (params) => {
    let arrayApp = params.photos;

    return (
      <div
        style={{
          color: "blue",
          fontSize: 12,

          textAlign: "center"
        }}
      >
        {arrayApp
          ? arrayApp.map((e, k) => {
              return (
                <a
                  key={k}
                  href={arrayApp[k].url}
                  target={arrayApp[k].name}
                  rel="noreferrer"
                >
                  <i className="pi pi-image" />
                </a>
              );
            })
          : "no photo"}
      </div>
    );
  };

  const linksBodyTemplate = (params) => {
    const arrayApp = params.links;
    /* console.log(arrayApp); */
    return (
      <div
        style={{
          color: "green",
          fontSize: 12,

          textAlign: "center"
        }}
      >
        {arrayApp
          ? arrayApp.map((e, k) => {
              return (
                <a key={k} href={arrayApp[k]} target="_blank" rel="noreferrer">
                  <i className="pi pi-external-link" />;
                </a>
              );
            })
          : "no links"}
      </div>
    );
  };

  //STATUS

  const inProgressBodyTemplate = (rowData) => {
    return (
      <i
        className={classNames("pi", {
          "true-icon pi-check-circle": rowData.inProgress,
          "false-icon pi-times-circle": !rowData.inProgress
        })}
      ></i>
    );
  };
  const closedBodyTemplate = (rowData) => {
    return (
      <i
        className={classNames("pi", {
          "true-icon pi-check-circle": rowData.closed,
          "false-icon pi-times-circle": !rowData.closed
        })}
      ></i>
    );
  };
  const approvedBodyTemplate = (rowData) => {
    return (
      <i
        className={classNames("pi", {
          "true-icon pi-check-circle": rowData.approved,
          "false-icon pi-times-circle": !rowData.approved
        })}
      ></i>
    );
  };

  const inProgressFilterTemplate = (options) => {
    return (
      <TriStateCheckbox
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.value)}
      />
    );
  };

  const closedFilterTemplate = (options) => {
    return (
      <TriStateCheckbox
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.value)}
      />
    );
  };

  const approvedFilterTemplate = (options) => {
    return (
      <TriStateCheckbox
        value={options.value}
        onChange={(e) => options.filterApplyCallback(e.value)}
      />
    );
  };

  // DATE

  const formatDate = (value) => {
    /* console.log(value); */
    return value.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  const endDateBodyTemplate = (rowData) => {
    return rowData.endDate;
  };

  const endDateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="DD/MM/YYYY"
        placeholder="DD/MM/YYYY"
        mask="99/99/9999"
      />
    );
  };

  const stDateBodyTemplate = (rowData) => {
    return formatDate(rowData.stDate);
  };

  const stDateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="DD/MM/YYYY"
        placeholder="DD/MM/YYYY"
        mask="99/99/9999"
      />
    );
  };

  //ACTION
  const actionBodyTemplate = (params) => {
    return (
      <div>
        <Button
          onClick={upDate(params.id)}
          style={{ backgroundColor: "green", margin: 2 }}
        >
          <i
            color="primary"
            aria-label="add to shopping cart"
            className="pi pi-upload"
          />
        </Button>
        <Button
          onClick={removeItem(params)}
          style={{ backgroundColor: "red", margin: 2 }}
        >
          <i aria-label="delete" className="pi pi-exclamation-triangle" />
        </Button>
      </div>
    );
  };

  const removeItem = useCallback(
    (el) => () => {
      /* console.log(id.row); */

      setTimeout(() => {
        navigate("/removeitem", { state: { ...el } });
      });
    },
    []
  );

  const upDate = useCallback(
    (id) => () => {
      setTimeout(() => {
        navigate("/update", { state: { id } });
      });
    },
    []
  );

  //COLUMNS

  const columnComponents = selectedColumns.map((col) => {
    /* console.log(col); */
    switch (col.field) {
      case "problem":
        return (
          <Column
            header="problem"
            key={col.field}
            field="problem"
            body={problemTemplate}
            tooltipOptions={{ className: "blue-tooltip", position: "top" }}
            sortable
            filter
            style={{ maxWidth: "7rem" }}
          />
        );
      case "cinema":
        return (
          <Column
            key={col.field}
            header="cinema"
            sortable
            field="cinema"
            body={cinemaBodyTemplate}
            filterField="cinema"
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "14rem" }}
            showFilterMatchModes={false}
            filter
            filterElement={cinemaFilterTemplate}
          />
        );
      case "priority":
        return (
          <Column
            key={col.field}
            header="priority"
            sortable
            field="priority"
            body={priorityBodyTemplate}
            filterField="priority"
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "7rem" }}
            showFilterMatchModes={false}
            filter
            filterElement={priorityFilterTemplate}
          />
        );
      case "area":
        return (
          <Column
            key={col.field}
            header="area"
            sortable
            field="area"
            body={areaBodyTemplate}
            filterField="area"
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "7rem" }}
            showFilterMatchModes={false}
            filter
            filterElement={areaFilterTemplate}
          />
        );
      case "capex":
        return (
          <Column
            key={col.field}
            header="capex"
            sortable
            field="capex"
            body={capexBodyTemplate}
            filterField="capex"
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "7rem" }}
            showFilterMatchModes={false}
            filter
            filterElement={capexFilterTemplate}
          />
        );
      case "category":
        return (
          <Column
            key={col.field}
            header="category"
            sortable
            field="category"
            body={categoryBodyTemplate}
            filterField="category"
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "7rem" }}
            showFilterMatchModes={false}
            filter
            filterElement={categoryFilterTemplate}
          />
        );
      case "inProgress":
        return (
          <Column
            key={col.field}
            header="inProgress"
            sortable
            field="inProgress"
            body={inProgressBodyTemplate}
            filterField="inProgress"
            filterMenuStyle={{ width: "7rem" }}
            style={{ minWidth: "4rem" }}
            showFilterMatchModes={false}
            filter
            filterElement={inProgressFilterTemplate}
          />
        );
      case "closed":
        return (
          <Column
            key={col.field}
            header="closed"
            sortable
            field="closed"
            body={closedBodyTemplate}
            filterField="closed"
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "7rem" }}
            showFilterMatchModes={false}
            filter
            filterElement={closedFilterTemplate}
          />
        );
      case "approved":
        return (
          <Column
            key={col.field}
            header="approved"
            sortable
            field="approved"
            body={approvedBodyTemplate}
            filterField="approved"
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "7rem" }}
            showFilterMatchModes={false}
            filter
            filterElement={approvedFilterTemplate}
          />
        );
      case "photos":
        return (
          <Column
            key={col.field}
            header="photos"
            field="photos"
            body={photosBodyTemplate}
            style={{ minWidth: "7rem" }}
          />
        );
      case "links":
        return (
          <Column
            key={col.field}
            header="links"
            field="links"
            body={linksBodyTemplate}
            style={{ minWidth: "7rem" }}
          />
        );
      case "endDate":
        return (
          <Column
            key={col.field}
            header="endDate"
            filterField="endDate"
            dataType="date"
            body={endDateBodyTemplate}
            style={{ minWidth: "7rem" }}
            filter
            filterElement={endDateFilterTemplate}
          />
        );
      case "stDate":
        return (
          <Column
            key={col.field}
            header="stDate"
            filterField="stDate"
            dataType="date"
            body={stDateBodyTemplate}
            style={{ minWidth: "7rem" }}
            filter
            filterElement={stDateFilterTemplate}
          />
        );

      default:
        return (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            sortable
            filter
          />
        );
    }
  });

  //PREPARE TO FUNCTION

  const getNewDataString = (stringDate) => {
    let stDateArrayToSplit = stringDate.split("/");
    return new Date(
      `${stDateArrayToSplit[2]}/${stDateArrayToSplit[1]}/${stDateArrayToSplit[0]}`
    );
  };

  const parsingItems = (data) => {
    console.log("data", data);
    console.log("olaola", data);
    return data.map((d) => {
      let newObj = { ...d, stDate: getNewDataString(d.stDate) };
      return newObj;
    });
  };

  const ultimateData = (data) => {
    /* console.log(filteredData, selectedItems, items); */
    if (filteredData.length > 0) {
      return filteredData;
    } else if (selectedItems.length > 0) {
      return selectedItems;
    }
    return itemsForTable ? itemsForTable : [];
    /*  console.log("itemsForTable in listPrme", itemsForTable); */
  };

  useEffect(() => {
    try {
      dispatch(getItems({ cinemas }))
        .then((res) => {
          setItemsForTable(parsingItems(res.payload));
        })
        .then(ultimateData());
    } catch (error) {
      alert("errore sul use effect di listPrime:", error);
    }

    initFilters1();
  }, [dispatch, cinemas]);

  return (
    <div>
      <Tooltip target=".export-buttons>button" position="bottom" />
      <div className="card">
        {ultimateData && (
          <DataTable
            ref={dt}
            showGridlines
            paginator
            rows={10}
            resizableColumns
            columnResizeMode="expand"
            filterDisplay="menu"
            globalFilterFields={[
              "cinema",
              "priority",
              "problem",
              "title",
              "area",
              "capex"
            ]}
            header={HeaderTable({
              globalFilterValue1,
              setGlobalFilterValue1,
              initFilters1,
              setFilters1,
              filters1,
              setSelectedColumns,
              selectedColumns,
              ultimateData
            })}
            emptyMessage="No items found."
            filters={filters1}
            dataKey="id"
            footerColumnGroup={FooterSection({ ultimateData })}
            value={itemsForTable}
            onValueChange={(e) => setFilteredData(e)}
            selectionMode="checkbox"
            responsiveLayout="scroll"
            selection={selectedItems}
            onSelectionChange={(e) => setSelectedItems(e.value)}
          >
            <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />

            {columnComponents}
            <Column header="action" body={actionBodyTemplate} />
          </DataTable>
        )}

        {itemsForTable.length > 0 ? (
          <Charts items={ultimateData()} />
        ) : (
          <div>Loading Data</div>
        )}
      </div>
    </div>
  );
};

export default Listsprime;
