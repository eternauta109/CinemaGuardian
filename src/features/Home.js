import { useEffect, useMemo, useCallback } from "react";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Container, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ListAltIcon from "@mui/icons-material/ListAlt";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import PendingTwoToneIcon from "@mui/icons-material/PendingTwoTone";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import { useSelector, useDispatch } from "react-redux";
import { getItems } from "../slice/itemSlice";
import moment from "moment";

import ToExcel from "./ExpToExcel";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const cinemas = useSelector((state) => state.cinemas);

  const removeItem = useCallback(
    (id) => () => {
      /* console.log(id.row); */
      const element = id.row;
      setTimeout(() => {
        navigate("/removeitem", { state: { ...element } });
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

  const columns = useMemo(
    () => [
      {
        field: "priority",
        headerName: "priority",
        align: "center",
        width: 120
      },
      {
        field: "id",
        headerName: "id",
        width: 60,
        renderHeader: () => <p>{"ID "}</p>
      },
      {
        field: "area",
        headerName: "area",
        width: 60
      },
      {
        field: "cinema",
        headerName: "cinema name"
      },
      {
        field: "title",
        headerName: "title",
        type: "text",

        width: 300
      },
      {
        field: "areaCinema",
        headerName: "cinema area",
        width: 120
      },

      {
        field: "problem",
        headerName: "details",
        align: "center",
        type: "text",
        renderCell: (cellValues) => {
          return (
            <Tooltip title={cellValues.value ? cellValues.value : ""}>
              <div style={{ itemAlign: "center" }}>
                <ListAltIcon />
              </div>
            </Tooltip>
          );
        },
        width: 70
      },

      {
        field: "category",
        headerName: "category",

        width: 120
      },
      {
        field: "competence",
        headerName: "competence",

        width: 120
      },

      {
        field: "stDate",
        headerName: "start date",

        type: "dateTime",

        width: 200
      },
      {
        headerName: "day work",

        /* type: "dateTime", */

        renderCell: (value) => {
          return <div>{moment(value.row.stDate, "DD/MM/YYYY").fromNow()}</div>;
        },

        width: 100
      },

      {
        field: "photos",

        name: "photos",
        headerName: "photos",

        renderCell: (cellValues) => {
          /* console.log("cell values", cellValues.value); */
          return (
            <div
              style={{
                color: "blue",
                fontSize: 12,

                textAlign: "center"
              }}
            >
              {cellValues.value
                ? cellValues.value.map((e, k) => {
                    return (
                      <a key={k} href={cellValues.value[k].url} target="_blank">
                        <PhotoSizeSelectActualOutlinedIcon
                          sx={{ p: 1, color: "primary" }}
                        />
                      </a>
                    );
                  })
                : null}
            </div>
          );
        },
        width: 150
      },

      {
        field: "links",

        name: "links",
        headerName: "links",

        renderCell: (cellValues) => {
          /* console.log("cell values", cellValues.value); */
          return (
            <div
              style={{
                color: "blue",
                fontSize: 12,

                textAlign: "center"
              }}
            >
              {cellValues.value
                ? cellValues.value.map((e, k) => {
                    return (
                      <a key={k} href={cellValues.value[k]} target="_blank">
                        <InsertLinkIcon sx={{ p: 1, color: "primary" }} />
                      </a>
                    );
                  })
                : null}
            </div>
          );
        },
        width: 150
      },

      {
        field: "quotation",
        headerName: "quotation",

        type: "number",
        width: 100
      },
      {
        field: "solved",
        headerName: "solved",
        width: 100,
        renderCell: (cellValues) => {
          return (
            <div
              style={{
                color: "blue",

                width: "100%",
                textAlign: "center"
              }}
            >
              {cellValues.value ? (
                <CheckCircleTwoToneIcon sx={{ p: 1, color: "green" }} />
              ) : (
                <PendingTwoToneIcon sx={{ p: 1, color: "red" }} />
              )}
            </div>
          );
        }
      },
      {
        field: "actions",
        headerName: "actions",
        type: "actions",
        width: 120,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<ArrowCircleUpIcon />}
            label="update"
            onClick={upDate(params.id)}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={removeItem(params)}
            showInMenu
          />
        ]
      }
    ],
    [upDate, removeItem]
  );

  const ExportToExcelHandle = () => {
    ToExcel(items);
  };
  useEffect(() => {
    dispatch(getItems({ cinemas }));
  }, []);

  return (
    <Container sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={items}
        columns={columns}
        pageSize={10}
        density="comfortable"
        autoHeight={true}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        components={{
          Toolbar: GridToolbar
        }}
      />
    </Container>
  );
};

export default Home;
