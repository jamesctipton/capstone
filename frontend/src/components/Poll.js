import React from 'react';
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles';
import PublicIcon from '@mui/icons-material/Public';
import FlightIcon from '@mui/icons-material/Flight';
import HotelIcon from '@mui/icons-material/Hotel';
import PlaceIcon from '@mui/icons-material/Place';
import axios from 'axios';

const url = "http://127.0.0.1:5000/vote-poll"

export function Poll(props) {

    const user = JSON.parse(localStorage.getItem('user'))

    const [options, setOptions] = React.useState(props.options);
    const [totalVotes, setTotalVotes] = React.useState(0);
    const [hp, setHP] = React.useState(true);

    if(props.totalVotes && (totalVotes != props.totalVotes)) {
        setTotalVotes(props.totalVotes);
    }
    
    if(user.votedPolls) {
      if(hp === true) {
        if(user.votedPolls.findIndex((element) => element === props.pollCode) != -1) {
          setHP(false);
        }
      }
    }

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
      height: 36,
      borderRadius: 5,
      [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
      },
      [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#CF7D30' : '#BE6C20',
      },
    }));
    
    const handleVote = (choice) => {
      var votedChoice = options.findIndex( (item) => {
        return item === choice
      });
      setTotalVotes(totalVotes + 1)
      var temp = options
      temp[votedChoice].votes++;
      
      setOptions(temp)
      setHP(false);

      user.votedPolls.push(props.pollCode)
      localStorage.setItem('user', JSON.stringify(user));

      // do server stuff
      axios.post(url, {
          pollCode: props.pollCode,
          option: votedChoice,
          username: user.name
      }).then((response) => {
          console.log(response)
      }).catch((error) => {
          console.log(error)
      })
    }
  
    return (
      <Card>
        <CardContent>
          {(props.category === 'destination') ?
          <PublicIcon fontSize='large' /> : <>
          {(props.category === 'flight') ?
          <FlightIcon fontSize='large' /> : <>
          {(props.category === 'hotel') ?
          <HotelIcon fontSize='large' /> :
          <PlaceIcon fontSize='large' /> }</>
          }</>
          }
          {options.map((item, i) => (              
            <Box key={item.name + i} sx={{display: 'grid', gridTemplateColumns: hp ? '1fr' : '1fr 8fr 35px', alignItems: 'center', columnGap: 1, mb: 1}}>
              <Button
                  disabled={!hp}
                  sx={{gridColumnStart: 1, justifySelf: 'stretch', width: '100%', "&:disabled": {color: '#CF7D30'}}}
                  onClick={() => { handleVote(item) }}
              >{item.name}</Button>
              
              <Box hidden={hp} sx={{ gridColumnStart: 2, justifySelf: 'start', width: '100%', mr: 1}}>
                <BorderLinearProgress variant="determinate" value={ Math.round( (item.votes / (props.totalVotes + 1)) * 100 ) }></BorderLinearProgress>
              </Box>
              <Box sx={{gridColumnStart: 3, minWidth: 35}}>
                <Typography hidden={hp} variant='h6' color="text.secondary">
                  {`${ Math.round( (item.votes / (props.totalVotes + 1)) * 100 ) }%`}
                </Typography>
              </Box>
    
            </Box>
          ))}
        </CardContent>
      </Card>
    );
  }