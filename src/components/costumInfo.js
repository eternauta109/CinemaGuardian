import React, { useState } from "react";
import Stack from "@mui/material/Stack";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CostumInfo({ messageType, dataMessage }) {
  console.log(messageType, dataMessage);
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const InfoAlert = () => {
    switch (messageType) {
      case "recordOk":
        return (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {`item recorded ${dataMessage}`}
            </Alert>
          </Snackbar>
        );

      default:
        return null;
    }
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <InfoAlert />
    </Stack>
  );
}
