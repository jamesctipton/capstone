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

    var hover = false;

    setInterval(() => {
        var elem = document.getElementById('car');
        var items = document.querySelectorAll('#car .car-item').length;

        if(!hover) {
            if(elem.scrollLeft >= (elem.scrollWidth / items * 4) ) {
                elem.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                })
            }
            else {
                elem.scrollBy({
                    left: (elem.scrollWidth / 6),
                    behavior: 'smooth'
                });
            }
        }   
    }, 3000);

    return (
        <Box>
            <Carousel></Carousel>
        </Box>
  )};
  
  export default Trip;