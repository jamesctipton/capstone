import React, { useEffect, useState } from "react";
import { Card, CardActionArea, Divider } from "@mui/material";
import { CardContent, CardMedia, Typography } from "@material-ui/core";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const url = "http://127.0.0.1:5000/vote-poll"
var hover = false;

//item:  {
//     groupname: string,
//     summary: string,
//     groupimage?: string,
//     groupCode: string,
//     members: int
// }

function CarouselItem(props) {

    var step = props.step // item type
    console.log(props)

    const navigate = useNavigate()
    const navigateToTrip = (groupCode) => {
        navigate('trip/' + step.groupCode, { user: props.user, groupCode: groupCode } )
    }

    return (
    <>
        <Card onMouseOver={() => { hover = true }} onMouseLeave={() => {hover = false}} sx={{ borderRadius: '10px', backgroundColor: '#dddddd',}}>
            <CardActionArea onClick={() => { navigateToTrip(step.groupCode) }}>
                <div style={{ position: 'absolute', zIndex: 100, backgroundColor: '#ffffff', opacity: 0.8, borderRadius: 100, width: 'auto', textAlign: 'center', padding: 12, margin: 16, right: 0 }} >
                    {(step.members == 0 || step.members == null) ? '' : step.members + ' people'}
                </div>
                {(step.groupimage == '' || step.groupimage == null) ?
                <div
                    style={{ backgroundColor: '#666666', height: '20rem', color: '#dddddd', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: 40, }}
                >No image
                </div>
                :
                <CardMedia
                    component='img'
                    height='320rem'
                    // src={`data:image/png;base64, ${step.groupimage}`}
                    image={step.groupimage}
                    alt={step.groupname}
                />
                }
                <CardContent>
                    <Typography  variant="h5" component='div'>{step.groupname}</Typography>
                    <Typography variant='body2'>{step.summary}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    </>
    );
}

// poll: {
//     pollname: string,
//     pollHash: string,
//     option1-5: pollItem?,
//     totalVotes: int
// }

// pollItem: {
//     name: string
//     description: string
//     votes: int
//     imgPath: string
// }

function PollItem(props) {
    var step = props.step;
    let didVote = props.didVote;

    const handleSingleVote = (name) => {
        props.handleVote(name)
        props.setDidVote(true)
    }

    return (
        <>
            <Card sx={{ borderRadius: '10px', backgroundColor: '#dddddd',}}>
                <CardActionArea onClick={() => { handleSingleVote(step.name) }}>
                    <div style={{ position: 'absolute', zIndex: 100, backgroundColor: '#ffffff', opacity: 0.8, borderRadius: 100, width: 'auto', textAlign: 'center', padding: 12, margin: 16, right: 0 }} >
                        {(didVote) ? `${((step.votes / props.totalVotes).toFixed(2) * 100)}%` : ''}
                    </div>
                    {(step.imgPath == '' || step.imgPath == null) ?
                    <div
                        style={{ backgroundColor: '#666666', height: '20rem', color: '#dddddd', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: 40, }}
                    >No image
                    </div>
                    :
                    <CardMedia
                        component='img'
                        height='312rem'
                        image={step.imgPath}
                        alt={step.name}
                    />
                    }
                    <CardContent style={{ maxHeight: '5rem', minHeight: '5rem' }}>
                        <Typography variant="body2" style={{ textAlign: 'center' }}>Click to Vote</Typography>
                        <Typography  variant="h6" component='div'>{step.name}</Typography>
                        <Typography variant="subtitle2" style={{ overflowY: 'scroll' }} >{step.description}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
        );
} 

let user;
export function Carousel(props) {

    const [items, setItems] = React.useState(props.items);
    const [totalVotes, setTotalVotes] = React.useState(0);
    const [didVote, setDidVote] = React.useState(false); // axios to check actual state
    if(props.totalVotes && (totalVotes != props.totalVotes)) {
        setTotalVotes(props.totalVotes);
    }

    useEffect(() => {
        user = JSON.parse(localStorage.getItem('user'))
    }, [])

    // do server stuff to check didVote

    setInterval(() => {
        var elem = document.getElementById('car');
        var carItems = (document.querySelectorAll('#car .car-item').length > 2) ? document.querySelectorAll('#car .car-item').length : 10;
        if(elem) {
            if(!hover) {
                if(elem.scrollLeft >= (elem.scrollWidth / carItems) ) {
                    elem.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    })
                }
                else {
                    elem.scrollBy({
                        left: (elem.scrollWidth / 6),
                        behavior: 'smooth'
                    });
                }
            }   
        }
    }, 5000);

    const handleVote = (choice) => {
        var votedChoice = items.findIndex( (item) => {
            return item.name === choice
        });
        var temp = items
        temp[votedChoice].votes++;
        
        setItems(temp)
        setTotalVotes(totalVotes + 1)

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
        <div id='car' onMouseOver={() => { hover = true }} onMouseLeave={() => {hover = false}} style={{width: '100%', minHeight: '25rem', display: 'flex', overflowX: 'scroll', scrollSnapType: 'x mandatory', }}>
            {(items.length === 1) 
            ? 
            <div style={{ marginRight: 'auto', marginLeft: 'auto' }}>
                <CarouselItem step={items[0]}></CarouselItem>
            </div>
            :
            <>
            <div className='car-spacer' style={{ backgroundColor: 'white', minWidth: '15%' }} />
            {items.map((step, index) => (
                <div key={index} className='car-item' style={{ backgroundColor: '#ffffff', minWidth: '45%', scrollSnapAlign: 'center', borderRadius: 10, marginRight: 8, marginLeft: 8 }}>
                    {(props.type == 'poll') ? 
                    <PollItem step={step} didVote={didVote} setDidVote={setDidVote} handleVote={handleVote} totalVotes={totalVotes}></PollItem>
                    :
                    <CarouselItem step={step} user={user}></CarouselItem>
                    }
                </div>
            ))}
            <div className='car-spacer' style={{ backgroundColor: 'white', minWidth: '15%' }} />
            </>
            }
        </div>
      );
  }