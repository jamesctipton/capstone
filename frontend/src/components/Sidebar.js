import { LocationCity, Hotel, Flight,Grade } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  // ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

const Sidebar = ({mode,setMode}) => {
  return (
    <Box  flex={0.5} p={8} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed">
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#location">
              <ListItemIcon>
                < LocationCity size="large"/>
              </ListItemIcon >
              <Typography variant="h6" color="primary" component="div" sx={{ fontSize: 28 }}>Location</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#Hotels">
              <ListItemIcon>
                < Hotel fontSize="large"/>
              </ListItemIcon>
              <Typography variant="h6" color="primary" component="div" sx={{ fontSize: 28 }}>Hotels</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#Flights">
              <ListItemIcon>
                <Flight fontsize= "large"/>
              </ListItemIcon>
              <Typography variant="h6" color="primary" component="div" sx={{ fontSize: 28 }}>Flights</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#PlaceOfInterest">
              <ListItemIcon>
                <Grade  fontSize= "large"/>
              </ListItemIcon>
              <Typography variant="h6" color="primary" component="div" sx={{ fontSize: 28 }}>Place of Interest</Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;








