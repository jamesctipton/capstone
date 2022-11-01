import './Home.css'
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress'
import { Button, Card, Typography } from '@mui/material';
import paris from './../assets/paris.jpeg';
import { createTheme, ThemeProvider } from '@mui/system';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const styles = {
  cardContainer: {
    backgroundImage: `url(${paris})`,
    backgroundSize: 'cover',
    backgroundColor: `rgba(0, 0, 0, 0.65)`, // not working
    overflow: 'hidden',
    height: 400,
    borderRadius: 25
  }
};


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

function CustomCarousel(props)
{
    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        },
        {
          name: "third",
          description: "unique tomar emeralds"
        }
    ]

    return (
        <Carousel animation='slide'>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <Card style={styles.cardContainer}>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Card>
    )
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
    <div class="poll-container">
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
          <div id="carousel"><CustomCarousel></CustomCarousel></div>
        </div>
        <h1>Polls WIP</h1>
        <CustomPoll></CustomPoll>
      </div>
    );
  };
  
  export default Home;