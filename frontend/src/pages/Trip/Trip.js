import React, { useEffect, useState } from 'react';
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

let user;
const Trip = (props) => {

  let groupIndex;
  let group;
  let polls;
  useEffect(() => {
    user = JSON.parse(localStorage.getItem('user'));

    if(!(Object.keys(user).length === 0 && user.constructor === Object)) {
      if(user.groups) {
        groupIndex = user.groups.findIndex( (item) => {
          return item.groupCode === props.groupCode
        });
      
        group = user.groups[groupIndex]
        if(group) {
          polls = group.polls
        }
      }
    }
  }, [])

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
  )};
  
  export default Trip;