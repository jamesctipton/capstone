import React, { useEffect, useState } from 'react';
import { 
  createTheme, Typography, 
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
  const user = JSON.parse(localStorage.getItem('user'))
  console.log(user)
  let groupIndex;
  let polls;

  const groupCode = window.location.href.substr(window.location.href.lastIndexOf('/') + 1) 
  console.log(groupCode)

  const group = user.groups.filter(object => {
    return object.groupCode === groupCode
  })[0]
  console.log(group, group.groupname)

  var samplePoll
  
  var totalVotes = 10

    return (
      <div>
        <div style={{ width: '100%', marginTop: '4%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h3" color='primary' sx={{ fontWeight: 500 }}>{group.groupname}</Typography>
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