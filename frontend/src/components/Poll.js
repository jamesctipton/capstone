import React from 'react';
import { Box, Button, Typography } from "@mui/material";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles';
import axios from 'axios';

const url = "http://127.0.0.1:5000/vote-poll"

export function Poll(props) {

    const user = props.user;
    const [options, setOptions] = React.useState(props.options);
    const [totalVotes, setTotalVotes] = React.useState(0);
    if(props.totalVotes && (totalVotes != props.totalVotes)) {
        setTotalVotes(props.totalVotes);
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
        return item.name === choice
      });
      setTotalVotes(totalVotes + 1)
      var temp = options
      temp[votedChoice].votes++;
      
      setOptions(temp)
      hidePercent(false);

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
  
    const [hp, hidePercent] = React.useState(true);
  
    return (
      <div className="poll-container">
        <Typography sx={{width: '100%', textAlign: 'center', fontWeight: 'bold', color: '#CF7D30', mb: 1}} variant='h2'>{props.title}</Typography>
        {options.map((i) => (              
          <Box key={i.name} sx={{display: 'grid', gridTemplateColumns: hp ? '1fr' : '1fr 8fr 35px', alignItems: 'center', columnGap: 1, mb: 1}}>
            <Button
                sx={{gridColumnStart: 1, justifySelf: 'stretch', width: '100%'}}
                onClick={() => { handleVote(i) }}
            >{i.name}</Button>
            
            <Box hidden={hp} sx={{ gridColumnStart: 2, justifySelf: 'start', width: '100%', mr: 1}}>
              <BorderLinearProgress variant="determinate" value={ Math.round( (i.votes / props.totalVotes) * 100 ) }></BorderLinearProgress>
            </Box>
            <Box sx={{gridColumnStart: 3, minWidth: 35}}>
              <Typography hidden={hp} variant='h6' color="text.secondary">
                {`${ Math.round( (i.votes / props.totalVotes) * 100 ) }%`}
              </Typography>
            </Box>
  
          </Box>
        ))}
      </div>
    );
  }