import {
  List,
  ListSubheader,
  ListItemButton,
  Grid,
  ListItemText
} from "@mui/material";

export const LinksSlider = ({ links }) => {
  return (
    <Grid container sx={{ mt: 1 }} spacing={1}>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            links photo list
          </ListSubheader>
        }
      >
        {links.map((e, k) => {
          return (
            <ListItemButton key={k} component="a" href={`${e}`} target="_blank">
              <ListItemText primary={e} />
            </ListItemButton>
          );
        })}
      </List>
    </Grid>
  );
};

export default LinksSlider;
