import './Home.css'
import React from 'react';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { Button, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Divider } from '@material-ui/core';
import Steps from '../../assets/Steps.png'
import { Link } from "react-router-dom";
import { Carousel } from '../../components/Carousel';

function CustomPoll(props) {

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

const trips = 3;

const Home = (isLoggedIn) => {

    return (
      <div>
        {(trips == 0) ?
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '16%'}}>
          <Typography sx={{width: '100%', textAlign: 'center', fontWeight: 'bold', color: '#CF7D30', mb: 1}} variant='h3'>You Have No Trips</Typography>
          <Typography sx={{width: '100%', textAlign: 'center', fontWeight: 'bold', color: '#666666', mb: 1}} variant='h5'>Click <a href='join-create'>Here</a> to create or join one</Typography>
        </div>        
        :
        <>
          <div id='carousel-container'>
          {(isLoggedIn && (trips>0)) ? 
            <div>
              <Typography sx={{width: '100%', textAlign: 'center', fontWeight: 'bold', color: '#CF7D30', mb: 1}} variant='h2'>Your Trips</Typography>
              <Carousel
                items={[
                  {
                      name: "Random Name #1",
                      description: "me and da boys in san fran",
                      imgPath: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
                      linkHash: '',
                      users: 5
                  },
                  {
                      name: "Indonesia",
                      description: "Hello World!",
                      imgPath: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
                      linkHash: '',
                      users: 10
                  },
                  {
                    name: "serbia",
                    description: "group trip",
                    imgPath: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
                    linkHash: '',
                    users: 3
                  }
              ]}
              ></Carousel>
            </div>  
            :
            <div>
              <Typography sx={{width: '100%', textAlign: 'center', fontWeight: 'bold', color: '#CF7D30', mb: 1}} variant='h2'>Best Deals</Typography>
              <Carousel></Carousel>
            </div> 
            }
          </div>
          <br></br>
          {(isLoggedIn && (trips>0)) ?
          <CustomPoll
            options={[
              {name: 'first', votes: 0},
              {name: 'second', votes: 1},
              {name: 'third', votes: 1},
            ]}
            ></CustomPoll> 
          :
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', margin: '10px 0 40px 0'}}>
            <Typography sx={{width: '100%', textAlign: 'center', fontWeight: 'bold', color: '#CF7D30', mb: 1}} variant='h2'>How Frí Works</Typography>
            <img src={Steps} alt="Steps" style={{width: '90%'}}></img>
            <Typography variant='h6' sx={{color: '#CF7D30'}}>Don't have an account? <a href='/register'>Register</a> or 
            <span><Button
            variant='outlined'
            sx={{m: 1, borderWidth: 3, borderRadius: 30, background: 'rgba(207, 125, 48, 0.31)', fontWeight: 600, whiteSpace: 'nowrap', minWidth: 'maxContent', width: 100, height: 40, fontSize: 15}}
            component={Link} to="/login"
            >Log In</Button></span></Typography>
          </div>
          }
          
        </>
        }
      </div>
    );
  };
  
  export default Home;