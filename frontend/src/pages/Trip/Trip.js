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

  let samplePoll = [
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
  ]
  
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
            :
            <Carousel 
              type="poll"
              items={samplePoll}
              totalVotes={totalVotes}
            ></Carousel>
          }
        </Box>
      </div>
  )};
  
  export default Trip;