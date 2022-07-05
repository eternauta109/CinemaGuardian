import {
  TextField,
  Button,
  FormLabel,
  Grid,
  Autocomplete
} from "@mui/material";

import SendMail from "./SendMail";

import moment from "moment";

/* import { useEffect } from "react"; */

import { useSelector } from "react-redux";

export const Pegaso = ({ item, itemChange, setItem, update }) => {
  /* console.log(update, item); */
  /* const [inputValue, setInputValue] = useState(); */

  const suppliers = useSelector((store) => store.suppliers);
  const user = useSelector((store) => store.user);

  moment.locale();

  let parse = moment(item.stDate, "DD/MM/YYYY");

  const onChangeSelect = (e, newValue) => {
    e.preventDefault();

    if (newValue) {
      setItem({
        ...item,
        competence: newValue
      });
    }
  };

  const onClickEvent = () => {
    let str = `${item.priority || "<no priority>"}-${item.item_ref || "..."}-${
      item.competence || "<no competence>"
    }-${item.title || "<no title>"}-${parse.format("MMMM")}`;

    setItem({
      ...item,
      pegasoStr: str
    });
  };

  /* useEffect(() => {}, []); */

  return (
    <Grid container sx={{ mt: 1 }} spacing={1} justify="center">
      <Grid item xs={12} sm={12}>
        <FormLabel id="timetable">Pegaso Section</FormLabel>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={suppliers || []}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.name === value.name}
          value={item.competence}
          fullWidth
          onChange={(e, newValue) => {
            onChangeSelect(e, newValue);
          }}
          renderInput={(params) => <TextField {...params} label="suppliers" />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          onChange={itemChange}
          value={item.orderNumber ?? ""}
          fullWidth
          multiline
          label="Pegaso order Number"
          name="orderNumber"
        />
      </Grid>

      <Grid item xs={4} sm={4}>
        <Button
          sx={{ height: "100%" }}
          variant="contained"
          color="success"
          fullWidth
          onClick={onClickEvent}
        >
          GET STRING FOR PEGASO ORDER
        </Button>
      </Grid>

      <Grid item xs={8} sm={8}>
        <TextField
          value={item.pegasoStr ?? ""}
          InputLabelProps={{ shrink: item.item_ref ? true : false }}
          fullWidth
          multiline
          label="Pegaso order string"
          name="pegasoOrderString"
        />
      </Grid>

      <Grid item xs={12} sm={12}>
        <SendMail item={item} user={user} />
      </Grid>
    </Grid>
  );
};

export default Pegaso;
