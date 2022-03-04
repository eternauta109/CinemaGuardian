import * as React from "react";
import { useState, useEffect } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  Select,
  TextField,
  Container,
  MenuItem,
  InputLabel,
  Grid,
  FormControl,
  FormLabel,
  InputAdornment,
  IconButton
} from "@mui/material";
import { palette } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Switch from "@mui/material/Switch";
import SaveIcon from "@mui/icons-material/Save";

import SetCamera from "./SetCamera";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TimeLine from "../components/TimeLine";
import { categoryList } from "../config/struttura";

const commonStyles = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  m: 1,
  border: 1
  /* width: '5rem',
  height: '5rem', */
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffac33"
    },
    secondary: {
      main: "#00e676"
    }
  }
});

export default function InputAnomalies({
  cinema,
  item,
  setItem,
  handleSubmit,
  user
}) {
  const [solved, setSolved] = useState(false);
  const [stDate, setStDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [comment, setComment] = useState();
  const [cinemaSelected, setCinemaSelected] = useState(null);

  const itemChange = (e) => {
    /* e.preventDefault(); */
    /* console.log("item change", e.target.name, e.target.value); */
    console.log("iten in anomalies", item);
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const cinemaSelect = (e) => {
    const res = cinema.find(({ name }) => name === `${e.target.value}`);
    setCinemaSelected(res);

    const numb = (res.rif_num + 1).toString();
    const ref_number = `${res.abbr}-${numb}`;
    /* console.log("res", cinemaSelected); */
    setItem({
      ...item,
      [e.target.name]: e.target.value,
      screens: res.screens,
      area: res.area,
      item_ref: ref_number
    });
  };

  const onCommentAdd = (e) => {
    setComment(e.target.value);
  };

  const onClickComment = (e) => {
    let newComment = {
      name: user.name,
      comment: comment,
      data: stDate.toLocaleDateString()
    };

    let newArray = item.comments;
    newArray.push(newComment);
    setItem({ ...item, comments: newArray });

    setComment("");
  };

  const solvedChange = (e, value) => {
    /* e.preventDefault(); */
    /* setItem({ ...item, solved: !item.solved}); */
    setSolved(e.target.checked);

    setItem({ ...item, endDate: endDate, solved: value });
  };

  useEffect(() => {
    console.log(item);
    setItem({ ...item, photos: [], comments: [] });
    console.log(item);
  }, [cinemaSelected]);

  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          borderRadius: 5,
          bgcolor: "#e0f2f1",
          color: "primary.contrastText",
          p: 2
        }}
      >
        <Grid container sx={{ mt: 1 }} spacing={1} justify="center">
          <Grid item xs={6} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="category">Cinema</InputLabel>
              <Select
                onChange={(e) => cinemaSelect(e)}
                value={item.cinema ?? ""}
                labelId="cinema"
                id="cinemaSelect"
                label="cinema"
                name="cinema"
              >
                {cinema.map((e, key) => {
                  return (
                    <MenuItem key={key} value={e.name}>
                      {e.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3} sm={3}>
            <TextField
              value={item.item_ref ?? ""}
              fullWidth
              disabled
              label="ref"
              name="ref"
            />
          </Grid>
          <Grid item xs={3} sm={3}>
            <TextField
              value={item.screens}
              fullWidth
              disabled
              label="screens"
              name="screens"
            />
          </Grid>
        </Grid>

        <Grid container sx={{ mt: 1 }} spacing={1} justify="center">
          <Grid item xs={6} sm={6}>
            <TextField
              value={item.area}
              fullWidth
              disabled
              label="area"
              name="area"
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                fullWidth
                renderInput={(props) => <TextField {...props} />}
                label="insert date"
                disabled
                value={item.stDate ?? stDate}
                onChange={(newValue) => {
                  setStDate(newValue);
                }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <hr />
        <Grid container sx={{ mt: 1 }} spacing={1} justify="center">
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="category">Category</InputLabel>
              <Select
                onChange={(e) => itemChange(e)}
                value={item.category ?? ""}
                labelId="category"
                id="categorySelect"
                label="Category"
                name="category"
              >
                {categoryList.map((e, key) => {
                  return (
                    <MenuItem key={key} value={e}>
                      {e}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              onChange={itemChange}
              value={item.areaCinema}
              fullWidth
              multiline
              label="cinema area"
              name="areaCinema"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              onChange={itemChange}
              value={item.problem}
              fullWidth
              multiline
              label="Problem description"
              name="problem"
            />
          </Grid>
        </Grid>
        <hr />

        <Grid container sx={{ mt: 1 }} spacing={1} justify="center">
          <Grid item xs={12} sm={12}>
            <TimeLine item={item} />
          </Grid>
        </Grid>

        <Grid container sx={{ mt: 1 }} spacing={1} justify="center">
          <Grid item xs={10} sm={10}>
            <TextField
              onChange={onCommentAdd}
              value={comment}
              fullWidth
              multiline
              label={`${user.name} comment`}
              name="comments"
            />
          </Grid>
          <Grid item xs={2} sm={2}>
            <IconButton
              aria-label="delete"
              size="large"
              color="primary"
              onClick={onClickComment}
            >
              <AddRoundedIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>

        <hr />

        <Grid container sx={{ mt: 1 }} spacing={1} justify="center">
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel id="priority">Priority</InputLabel>
              <Select
                onChange={itemChange}
                value={item.priority ?? ""}
                labelId="priority"
                name="priority"
                id="prioritySelect"
                label="Priority"
              >
                <MenuItem value="P1">P1</MenuItem>;
                <MenuItem value="P2">P2</MenuItem>;
                <MenuItem value="P3">P3</MenuItem>;
                <MenuItem value="P4">P4</MenuItem>;
                <MenuItem value="P5">P5</MenuItem>;
                <MenuItem value="P6">P6</MenuItem>;
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              onChange={itemChange}
              value={item.competence}
              fullWidth
              multiline
              label="competence"
              name="competence"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel id="capexLabel">Capex/Opex</FormLabel>
              <RadioGroup
                row
                onChange={itemChange}
                aria-labelledby="capexLabel"
                name="capex"
                value={item.capex}
              >
                <FormControlLabel
                  value="Capex"
                  control={<Radio />}
                  label="Capex"
                />
                <FormControlLabel
                  value="Opex"
                  control={<Radio />}
                  label="Opex"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container sx={{ mt: 4 }} spacing={1} justify="center">
          <SetCamera
            user={user}
            cinema={cinemaSelected}
            item={item}
            setItem={setItem}
          />
        </Grid>

        <hr />

        <Grid container sx={{ mt: 1 }} spacing={1} justify="center">
          <Grid item xs={4} sm={4}>
            <TextField
              label="Quotation"
              type="number"
              variant="standard"
              onChange={itemChange}
              name="quotation"
              id="standard-size-small"
              sx={{ m: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={4} sm={4}>
            <TextField
              label="orderCost"
              type="number"
              variant="standard"
              onChange={itemChange}
              name="orderCost"
              id="standard-size-small"
              sx={{ m: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={4} sm={4}>
            <TextField
              label="finalCost"
              type="number"
              variant="standard"
              onChange={itemChange}
              name="finalCost"
              id="standard-size-small"
              sx={{ m: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>

        <hr />
        <Grid container sx={{ mt: 1 }} spacing={1} justify="center">
          <Grid item xs={12} sm={4}>
            <Switch
              checked={solved}
              id="solved"
              onChange={solvedChange}
              inputProps={{ "aria-label": "Issues close" }}
            />
            <FormLabel id="solved">Solved</FormLabel>
          </Grid>
          <Grid item xs={6} sm={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                fullWidth
                renderInput={(props) => <TextField {...props} />}
                label="solved date"
                disabled
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                  setItem({ ...item, endDate });
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6} sm={4}>
            <TextField fullWidth multiline label="day works" name="worktime" />
          </Grid>
        </Grid>

        <hr />
        <Grid container sx={{ mt: 4 }} spacing={1} justify="center">
          <Grid item xs={12}>
            <LoadingButton
              color="secondary"
              onClick={handleSubmit}
              /* loading={loading} */
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              size="large"
            >
              ADD ITEM
            </LoadingButton>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
