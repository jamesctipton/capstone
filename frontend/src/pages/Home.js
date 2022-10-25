import './Home.css'
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { LeafPoll, Result } from 'react-leaf-polls';
import { Paper, Button, Card, requirePropFactory } from '@mui/material';
import paris from './../assets/paris.jpeg';

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

const resData = [
  { id: 0, text: 'Answer 1', votes: 0 },
  { id: 1, text: 'Answer 2', votes: 0 },
  { id: 2, text: 'Answer 3', votes: 0 }
]

const customTheme = {
  textColor: 'black',
  mainColor: '#00B87B',
  backgroundColor: 'rgb(255,255,255)',
  alignment: 'center'
}

function vote(item, results) {
  // Here you probably want to manage
  // and return the modified data to the server.
  // uses Result types
}

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


const Home = () => {
    return (
      <div>
        <div id='carousel-container'>
          <div id="carousel"><CustomCarousel></CustomCarousel></div>
        </div>
        <h1>Polls WIP</h1>
        <LeafPoll
          type='multiple'
          question='What you wanna ask?'
          results={resData}
          theme={customTheme}
          onVote={vote}
          isVoted={false}
        />
      </div>
    );
  };
  
  export default Home;