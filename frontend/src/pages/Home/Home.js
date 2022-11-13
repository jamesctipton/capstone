import './Home.css'
import React from 'react';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { Button, Card, Paper, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/system';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const theme = createTheme({
  palette: {
    primary: {
      main: '#CF7D30',
      darker: '#BE6C20'
    },
    secondary: {
      main: '#00000'
    }
  }
});

function CustomCarousel(props) {
  
  const [activeStep, setActiveStep] = React.useState(0);
  const [isHovered, setHover] = React.useState(false);

  const handleNext = () => {
    if(activeStep === items.length - 1) {
      setActiveStep(0)
    }
    else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if(activeStep === 0) {
      setActiveStep(items.length)
    }
    else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  
  var items = [
        {
            name: "Random Name #1",
            description: "me and da boys in san fran",
            imgPath: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60'
        },
        {
            name: "Indonesia",
            description: "Hello World!",
            imgPath: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250'
        },
        {
          name: "serbia",
          description: "group trip",
          imgPath: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
        }
    ]

    return (
      <Box sx={{maxWidth: 800, flexGrow: 1, borderRadius: 25}}>

        <Paper
            square
            elevation={0}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: 60,
              pl: 2,
              bgcolor: '#eeeeee',
              borderRadius: "25px 25px 0 0"
            }}
          >
            <Typography sx={{width: '100%', textAlign: 'center'}} variant='h6'>{items[activeStep].name}</Typography>
            <Typography sx={{width: '100%', textAlign: 'center'}} variant='p'>{items[activeStep].description}</Typography>
          </Paper>
          <AutoPlaySwipeableViews
            axis='x'
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
            onMouseEnter={() => {setHover(true)}}
            onMouseLeave={() => {setHover(false)}}
            autoplay={!isHovered}
          >
            {items.map((step, index) => (
              <div key={step.name}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      height: 510,
                      display: 'block',
                      maxWidth: 800,
                      overflow: 'hidden',
                      width: '100%',
                    }}
                    src={step.imgPath}
                    alt={step.name}
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
        <MobileStepper
          variant='dots'
          steps={items.length}
          position="static"
          activeStep={activeStep}
          sx={{ maxWidth: 800, flexGrow: 1, bgcolor: '#eeeeee', borderRadius: '0 0 25px 25px'}}
          nextButton={
            <Button size="small" onClick={handleNext}>
              <ArrowForwardIosIcon/>
            </Button>
          }
          backButton={
            <Button size='small' onClick={handleBack}>
              <ArrowBackIosNewIcon/>
            </Button>
          }
          />
        </Box>
    );
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

const options = [
  {name: 'first', votes: 0},
  {name: 'second', votes: 1},
  {name: 'third', votes: 1},
]

function CustomPoll(props) {

  const handleVote = (item) => {
    item.votes += 1;
    hidePercent(false);
  }

  const [hp, hidePercent] = React.useState(true);

  return (
    <div className="poll-container">
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

const Home = () => {

    return (
      <div>
        <div id='carousel-container'>
          <CustomCarousel></CustomCarousel>
        </div>
        <h1>Polls WIP</h1>
        <CustomPoll></CustomPoll>
      </div>
    );
  };
  
  export default Home;