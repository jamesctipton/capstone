import './Home.css'
import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Card, requirePropFactory } from '@mui/material'
import paris from './../assets/paris.jpeg';

const styles = {
  cardContainer: {
    backgroundImage: `url(${paris})`,
    backgroundSize: 'cover',
    overflow: 'hidden',
    height: 400
  }
};

function Example(props)
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
      <Example></Example>
    );
  };
  
  export default Home;