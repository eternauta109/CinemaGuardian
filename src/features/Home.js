import { useEffect, useMemo, useCallback } from "react";
import PhotoSizeSelectActualOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Container, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useSelector, useDispatch } from "react-redux";
import { getItems } from "../slice/itemSlice";

import ToExcel from "./ExpToExcel";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const cinemas = useSelector((state) => state.cinemas);

  const deleteUser = useCallback(
    (id) => () => {
      setTimeout(() => {
        console.log(id);
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
        field: "id",
        headerName: "ID",
        width: 10,
        renderHeader: () => (
          <strong>
            {"ID "}
            {/*     <span role="img" aria-label="enjoy">
            🎂
          </span> */}
          </strong>
        )
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
        field: "areaCinema",
        headerName: "cinema area",
        width: 120
      },
      {
        field: "title",
        headerName: "title",
        type: "text",

        width: 300
      },
      {
        field: "problem",
        headerName: "details",
        align: "center",
        type: "text",
        renderCell: (cellValues) => {
          return (
            <Tooltip title={cellValues.value}>
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
        field: "photos",

        name: "photos",
        headerName: "photoLink",

        renderCell: (cellValues) => {
          return (
            <div
              style={{
                color: "blue",
                fontSize: 12,

                textAlign: "center"
              }}
            >
              {cellValues.value.map((e, k) => {
                return (
                  <a key={k} href={cellValues.value[k]} target="_blank">
                    <PhotoSizeSelectActualOutlinedIcon
                      sx={{ p: 1, color: "primary" }}
                    />
                  </a>
                );
              })}
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
              {cellValues.values ? (
                <span>true</span>
              ) : (
                <span
                  style={{
                    background: "red",
                    color: "white",
                    borderRadius: "10px",
                    fontSize: 12,
                    padding: 4
                  }}
                >
                  false
                </span>
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
            showInMenu
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteUser(params.id)}
          />
        ]
      }
    ],
    [upDate, deleteUser]
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
