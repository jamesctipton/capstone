import React, { useEffect, useState } from 'react';
import { 
  Card,
  createTheme, Typography, 
} from '@mui/material';
import { Box, CardContent, CardMedia } from '@material-ui/core';
import { Carousel } from '../../components/Carousel';
import { Poll } from '../../components/Poll';

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

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <article style={{  }}>
          <img src={group.groupimage} style={{ opacity: 0.25, minWidth: '150%', height: 500, borderRadius: 20, display: 'block', overflowY: 'clip', marginLeft: '-25%' }} />
          <h1 style={{ fontSize: 80, color: '#CF7D30', textAlign: 'center', position: 'absolute', top: 0, bottom: 400, left: 0, right: 0, height: 'fit-content', fontWeight: 400, margin: 'auto', textShadow: '#444 0px 0px 2px,   #444 0px 0px 2px,   #444 0px 0px 2px, #444 0px 0px 2px,   #444 0px 0px 2px,   #444 0px 0px 2px' }}>{group.groupname}</h1>
          <h2 style={{ fontSize: 30, color: '#222222', textAlign: 'center', position: 'absolute', top: 0, bottom: 200, left: 0, right: 0, height: 'fit-content', margin: 'auto' }}>{group.date === '' ? group.date : 'No Date Selected Yet'}</h2>
        </article>
      </div>
      <Box sx={{marginTop: '3%'}}>
          {(polls) ?
          <>
            {polls.map((poll) => (
            // <Carousel 
            //   type="poll"
            //   items={poll}
            //   totalVotes={poll.totalVotes}
            // ></Carousel>
            <Poll
              options={poll}
              totalVotes={poll.totalVotes}
              title={poll.pollname}
              category={poll.category}
              user={user}
            />
          ))}
          </>
          : <Typography variant='h6' sx={{ width: '100%', textAlign: 'center', color: '#CF7D30' }}>You have no polls</Typography>
        }
      </Box>
    </div>
  )};
  
  export default Trip;