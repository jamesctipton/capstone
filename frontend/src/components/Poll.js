import React from 'react';
import { Box, Button, Typography } from "@mui/material";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { styled } from '@mui/material/styles';

export function Poll(props) {

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
    
    const options = props.options;
  
    const handleVote = (item) => {
      item.votes += 1;
      hidePercent(false);
    }
  
    const [hp, hidePercent] = React.useState(true);
  
    return (
      <div className="poll-container">
        <Typography sx={{width: '100%', textAlign: 'center', fontWeight: 'bold', color: '#CF7D30', mb: 1}} variant='h2'>Active Polls</Typography>
        {options.map((i) => (              
          <Box key={i.name} sx={{display: 'grid', gridTemplateColumns: hp ? '1fr' : '1fr 8fr 35px', alignItems: 'center', columnGap: 1, mb: 1}}>
            <Button
                sx={{gridColumnStart: 1, justifySelf: 'stretch', width: '100%'}}
                onClick={() => { handleVote(i) }}
            >{i.name}</Button>
            
            <Box hidden={hp} sx={{ gridColumnStart: 2, justifySelf: 'start', width: '100%', mr: 1}}>
              <BorderLinearProgress variant="determinate" value={ Math.round( (i.votes / (options.reduce((total, current) => total = total + current.votes, 0))) * 100 ) }></BorderLinearProgress>
            </Box>
            <Box sx={{gridColumnStart: 3, minWidth: 35}}>
              <Typography hidden={hp} variant='h6' color="text.secondary">
                {`${ Math.round( (i.votes / (options.reduce((total, current) => total = total + current.votes, 0))) * 100 ) }%`}
              </Typography>
            </Box>
  
          </Box>
        ))}
      </div>
    );
  }