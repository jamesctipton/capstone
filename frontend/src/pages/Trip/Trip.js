import React, { useEffect, useState } from 'react';
import { 
  Card,
  createTheme, Typography, 
} from '@mui/material';
import { Box, CardContent, CardMedia } from '@material-ui/core';
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
  const user = JSON.parse(localStorage.getItem('user'))
  let groupIndex;
  let polls;

  const groupCode = window.location.href.substr(window.location.href.lastIndexOf('/') + 1) 

  const group = user.groups.filter(object => {
    return object.groupCode === groupCode
  })[0]
  console.log(group)

  var samplePoll
  
  var totalVotes = 10

    return (
      <div>
        <div style={{ width: '100%', marginTop: '4%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <article>
            <img src={group.groupimage} style={{ opacity: 0.25, width: '100%', borderRadius: 20 }} />
            <h1 style={{ fontSize: 80, color: '#CF7D30', textAlign: 'center', position: 'absolute', top: 0, bottom: 300, left: 0, right: 0, height: 'fit-content', margin: 'auto', textShadow: '#444 0px 0px 2px,   #444 0px 0px 2px,   #444 0px 0px 2px, #444 0px 0px 2px,   #444 0px 0px 2px,   #444 0px 0px 2px' }}>{group.groupname}</h1>
            <h2 style={{ fontSize: 30, color: '#222222', textAlign: 'center', position: 'absolute', top: 0, bottom: 100, left: 0, right: 0, height: 'fit-content', margin: 'auto' }}>12th December 2023 - 24th December 2023</h2>
          </article>
        </div>
        <Box sx={{marginTop: '3%'}}>
            {(polls) ?
            <>
              {polls.map((poll) => (
              <Carousel 
                type="poll"
                items={poll}
                totalVotes={poll.totalVotes}
              ></Carousel>
            ))}
            </>
            : <Typography variant='h6' sx={{ width: '100%', textAlign: 'center', color: '#CF7D30' }}>You have no polls</Typography>
          }
        </Box>
      </div>
  )};
  
  export default Trip;