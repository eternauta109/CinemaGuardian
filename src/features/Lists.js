import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef
} from "react";

import { Tooltip, IconButton } from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import PendingTwoToneIcon from "@mui/icons-material/Pending";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import ListAltIcon from "@mui/icons-material/ListAlt";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import DeleteIcon from "@mui/icons-material/Delete";

import Charts from "../components/Charts";

import { AgGridReact } from "ag-grid-react";
import { useSelector, useDispatch } from "react-redux";
import { getItems } from "../slice/itemSlice";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const Lists = () => {
  const items = useSelector((state) => state.items);
  const cinemas = useSelector((state) => state.cinemas);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "400" }), []);
  const gridStyle = useMemo(() => ({ height: "400px", width: "100%" }), []);

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      resizable: true,
      minWidth: 100,
      flex: 1
    };
  }, []);

  const onBtnExport = useCallback(() => {
    gridRef.current.api.exportDataAsCsv();
  }, []);

  const onBtnUpdate = useCallback(() => {
    document.querySelector(
      "#csvResult"
    ).value = gridRef.current.api.getDataAsCsv();
  }, []);

  function MyRenderer(params) {
    return <span> {params.value}</span>;
  }

  const linkRenderer = (params) => {
    return (
      <div
        style={{
          color: "blue",
          fontSize: 12,

          textAlign: "center"
        }}
      >
        {params.value
          ? params.value.map((e, k) => {
              return (
                <a key={k} href={params.value[k]} target="_blank">
                  <InsertLinkIcon sx={{ p: 1, color: "primary" }} />
                </a>
              );
            })
          : null}
      </div>
    );
  };

  const photoRenderer = (params) => {
    let arrayApp = params.value;

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
                  href={params.value[k].url}
                  target={params.value[k].name}
                >
                  <PhotoSizeSelectActualOutlinedIcon
                    sx={{ p: 1, color: "primary" }}
                  />
                </a>
              );
            })
          : null}
      </div>
    );
  };

  const inProgressRenderer = (params) => {
    return (
      <div
        style={{
          color: "blue",

          width: "100%",
          textAlign: "center"
        }}
      >
        <Tooltip title="In progress">
          {params.data.inProgress ? (
            <CheckCircleTwoToneIcon sx={{ color: "green" }} />
          ) : (
            <PendingTwoToneIcon sx={{ color: "orange" }} />
          )}
        </Tooltip>
      </div>
    );
  };

  const approvedRenderer = (params) => {
    /*   console.log("inprogress params", params.data.inProgress); */
    return (
      <div
        style={{
          color: "blue",

          width: "100%",
          textAlign: "center"
        }}
      >
        <Tooltip title="In progress">
          {params.data.approved ? (
            <CheckCircleTwoToneIcon sx={{ color: "green" }} />
          ) : (
            <PendingTwoToneIcon sx={{ color: "orange" }} />
          )}
        </Tooltip>
      </div>
    );
  };

  const closedRenderer = (params) => {
    return (
      <div
        style={{
          color: "blue",

          width: "100%",
          textAlign: "center"
        }}
      >
        <Tooltip title="In progress">
          {params.data.closed ? (
            <CheckCircleTwoToneIcon sx={{ color: "green" }} />
          ) : (
            <PendingTwoToneIcon sx={{ color: "orange" }} />
          )}
        </Tooltip>
      </div>
    );
  };

  const problemRenderer = (params) => {
    return (
      <div
        style={{
          width: "100%",
          textAlign: "center"
        }}
      >
        <Tooltip title={params.value ? params.value : ""}>
          <div style={{ itemAlign: "center" }}>
            <ListAltIcon />
          </div>
        </Tooltip>
      </div>
    );
  };

  const priorityRenderer = (params) => {
    switch (params.value) {
      case "P1":
        return (
          <div
            style={{
              backgroundColor: "red",
              color: "white",
              borderRadius: "20%"
            }}
          >
            {" "}
            {params.value}
          </div>
        );
      case "P2":
        return (
          <div
            style={{
              backgroundColor: "orange",
              color: "white",
              borderRadius: "20%"
            }}
          >
            {" "}
            {params.value}
          </div>
        );
      case "P3":
        return (
          <div
            style={{
              backgroundColor: "grey",
              color: "white",
              borderRadius: "20%"
            }}
          >
            {" "}
            {params.value}
          </div>
        );

      default:
        return (
          <div
            style={{
              backgroundColor: "green",
              color: "white",
              borderRadius: "20%"
            }}
          >
            {" "}
            {params.value}
          </div>
        );
    }
  };

  const actionRenderer = (params) => {
    return (
      <div>
        <IconButton
          onClick={upDate(params.data.id)}
          color="primary"
          aria-label="add to shopping cart"
        >
          <ArrowCircleUpIcon />
        </IconButton>
        <IconButton onClick={removeItem(params.data)} aria-label="delete">
          <DeleteIcon />
        </IconButton>
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

  const [columnDefs, setColumnDefs] = useState([
    { field: "id", editable: false, cellRenderer: MyRenderer, sortable: true },
    {
      field: "cinema",
      editable: false,
      sortable: true,
      filter: "agTextColumnFilter",
      filterParams: {
        filterOptions: ["contains", "startsWith", "endsWith"],
        defaultOption: "startsWith"
      }
    },
    {
      field: "area",
      editable: false,
      sortable: true,
      filter: "agTextColumnFilter"
    },
    { field: "title", editable: false, sortable: true },
    {
      field: "priority",
      editable: false,
      filter: "agTextColumnFilter",
      sortable: true,
      maxWidth: 75,
      cellRenderer: priorityRenderer
    },
    { field: "problem", editable: false, cellRenderer: problemRenderer },
    { field: "capex", editable: false, sortable: true },
    { field: "photos", editable: false, cellRenderer: photoRenderer },
    { field: "links", editable: false, cellRenderer: linkRenderer },
    {
      field: "stDate",
      editable: false,
      filter: "agDateColumnFilter",
      sortable: true
    },
    { field: "dayWorks", editable: false, sortable: true },
    { field: "category", editable: false, sortable: true },
    {
      field: "competence",
      editable: false,
      sortable: true,
      filter: "agTextColumnFilter"
    },
    { field: "quotation", editable: false, sortable: true },
    { field: "orderCost", editable: false, sortable: true },
    { field: "finalCost", editable: false, sortable: true },
    {
      field: "inProgress",
      cellRenderer: inProgressRenderer,
      sortable: true,
      filter: "agTextColumnFilter",
      editable: false
    },
    {
      field: "approved",
      cellRenderer: approvedRenderer,
      sortable: true,
      filter: "agTextColumnFilter",
      editable: false
    },
    {
      field: "closed",
      cellRenderer: closedRenderer,
      sortable: true,
      filter: "agTextColumnFilter",
      editable: false
    },
    { field: "endDate", filter: "agTextColumnFilter", editable: false },
    { field: "action", cellRenderer: actionRenderer }
  ]);

  const getRowId = useCallback((params) => params.data.id, []);

  useEffect(() => {
    dispatch(getItems({ cinemas }));
    /*  console.log(items); */
  }, []);

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          rowHeight="60"
          ref={gridRef}
          getRowId={getRowId}
          animateRows="true"
          rowData={items}
          defaultColDef={defaultColDef}
          columnDefs={columnDefs}
        ></AgGridReact>
      </div>
      <div style={{ margin: "10px 0" }}>
        <button onClick={onBtnExport}>Download CSV export file</button>
      </div>
      <Charts items={items} />
    </div>
  );
};
export default Lists;
