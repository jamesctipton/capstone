import React from 'react'
import { Favorite, FavoriteBorder, LocationCity, Hotel, Flight, Grade } from "@mui/icons-material";
import { Box, Divider, Stack, Card, CardActions, CardContent, CardHeader, Checkbox, IconButton, Typography, List, ListItem, ListItemButton, ListItemIcon } from "@mui/material";

// required
let menuItems = [
  'locations',
  'hotels',
  'flights',
  'places of interest'
]

// test data
let favorites = [
    [ // locations
      {
        title: 'Paris',
        subtitle: 'FR',
        description: 'location of x group'
      },
      {
        title: 'Madrid',
        subtitle: 'SP',
        description: 'location of x group'
      }
    ],
    [ // hotels
      {
        title: 'hotel name',
        subtitle: "city",
        description: 'where it is'
      }
    ],
    [ // flights
      {
        title: 'AZ to MO',
        subtitle: '',
        description: 'trip used for or something'
      }
    ],
    [ // pois
      {
        title: 'Eiffel Tower',
        subtitle: 'paris, france',
        description: 'big ass tower'
      }
    ]
]

function FavoriteOption(props) {
  return (
    <Card sx={{ margin: 5, width: '100%',  }}>
        <CardHeader
          title={props.option.title}
          subheader={props.option.subtitle}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
              {props.option.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            />
          </IconButton>
        </CardActions>
      </Card>
  );
}

const Favorites = () => {
  return (
    <>
    <Typography sx={{width: '100%', textAlign: 'center', 
        fontWeight: 'bold',
        color: '#CF7D30', mb: 1}} variant='h3'>Favorites</Typography>
    <Stack direction='row' justifyContent='left'>      
      <Box position={'sticky'} top={10} flex={0.3} p={8} sx={{ display: { xs: "none", sm: "block" } }}>
        <List>
          {menuItems.map((item, i) => {
            return (
              <ListItem key={i} disablePadding>
                <ListItemButton component="a" href={"#" + item}>
                  <ListItemIcon>
                    <> {menuItems[i] === 'locations' ?
                    < LocationCity size="large"/> :
                    <>{menuItems[i] === 'hotels' ?
                    <Hotel size="large" /> :
                    <>{menuItems[i] === 'flights' ?
                    <Flight size="large" /> :
                    <Grade size="large" />
                    }</> }</> }</>
                  </ListItemIcon >
                  <Typography variant="h6" color="primary" component="div" sx={{ fontSize: 28, textTransform: 'capitalize' }}>{item}</Typography>
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Box>
      <Box>
      {favorites.map((category, i) => {
        return (
          <Box id={menuItems[i]} key={i} >
              {category.map((option, j) => {
                return (
                  <FavoriteOption option={option} key={j} />
                )
            })}
            <Divider />
          </Box>
        )
      })}
      </Box>
    </Stack>
    </>
  );
}

export default Favorites 
