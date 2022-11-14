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

    return (
        <Box sx={{marginTop: '3%'}}>
            <Carousel items={[
                {name: 'asdfa'},
                {name: 'fasdf'}
            ]}></Carousel>
        </Box>
  )};
  
  export default Trip;