import React, { useState } from 'react';
import { 
  createTheme, 
} from '@mui/material';
import { Box } from '@material-ui/core';
import { Carousel } from '../../components/Carousel';

const url = 'http://127.0.0.1:5000/trip'
const theme = createTheme({
  palette: {
    primary: {
      main: '#CF7D30',
      darker: '#BE6C20'
    }
  }
});


const Trip = (props) => {

  var totalVotes = 10

    return (
        <Box sx={{marginTop: '3%'}}>
            <Carousel 
              type="poll"
              items={[
                {
                  name: 'option 1',
                  description: "sample",
                  votes: 1,
                  image: ""
                },
                {
                  name: 'option 2',
                  description: "",
                  votes: 2,
                  image: ""
                },
                {
                  name: 'option 3',
                  description: "another description thats very long another description thats very long another description thats very long another description thats very long another description thats very long another description thats very long",
                  votes: 3,
                  image: ""
                },
                {
                  name: 'option 4',
                  description: "",
                  votes: 4,
                  image: ""
                },
                
              ]}
              totalVotes={totalVotes}
            ></Carousel>
        </Box>
  )};
  
  export default Trip;