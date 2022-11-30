import React from 'react';
import { 
  createTheme, Typography, 
} from '@mui/material';
import { Box } from '@material-ui/core';
import { Carousel } from '../../components/Carousel';

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
  let polls;

  const groupCode = window.location.href.substr(window.location.href.lastIndexOf('/') + 1) 

  const group = user.groups.filter(object => {
    return object.groupCode === groupCode
  })[0]

  let samplePoll = [
        {
          name: 'san fran',
          description: "sample",
          votes: 1,
          image: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60"
        },
        {
          name: 'indonesia',
          description: "we love oceania",
          votes: 2,
          image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250"
        },
        {
          name: 'serbia',
          description: "getting cold w the boys",
          votes: 4,
          image: "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60"
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