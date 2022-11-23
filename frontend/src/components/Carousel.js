import React, { useState } from "react";
import { Card, CardActionArea, Divider } from "@mui/material";
import { CardContent, CardMedia, Typography } from "@material-ui/core";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

//item:  {
//     name: string,
//     description: string,
//     imgPath?: string,
//     groupCode: string,
//     members: int
// }

function CarouselItem(props) {
    var step = props.step // item type
    return (
    <>
        <Card sx={{ borderRadius: '10px', backgroundColor: '#dddddd',}}>
            <CardActionArea href={'trip/' + step.groupCode}>
                <div style={{ position: 'absolute', zIndex: 100, backgroundColor: '#ffffff', opacity: 0.8, borderRadius: 100, width: 'auto', textAlign: 'center', padding: 12, margin: 16, right: 0 }} >
                    {(step.members == 0 || step.members == null) ? '' : step.members + ' people'}
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
                <CardContent>
                    <Typography  variant="h5" component='div'>{step.name}</Typography>
                    <Typography variant='body2'>{step.description}</Typography>
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
//     votes: int
//     imgPath: string
// }

function PollItem({props, handleVote, voted}) {
    var choice = props.choice; // temp

    return (
        <>
            <Card sx={{ borderRadius: '10px', backgroundColor: '#dddddd',}}>
                <CardActionArea disabled> {/* add link functionality for more details type beat */}
                <div style={{ position: 'absolute', zIndex: 100, backgroundColor: '#ffffff', opacity: 0.8, borderRadius: 100, width: 'auto', textAlign: 'center', padding: 12, margin: 16, right: 0 }} >
                {(voted == false ) ? 'Vote' : ((choice.votes / choice.totalVotes).toFixed(2) * 100) + '%'}
                </div>
                {(choice.imgPath == '' || choice.imgPath == null) ?
                <div
                    style={{ backgroundColor: '#666666', height: '20rem', color: '#dddddd', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: 40, }}
                >No image
                </div>
                :
                <CardMedia
                    component='img'
                    height='312rem'
                    image={choice.imgPath}
                    alt={choice.name}
                />
                }
                <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 0 }}>
                    <Typography variant="h6">{choice.name}</Typography>
                </CardContent>
                </CardActionArea>
                <CardContent style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 0, height: '6rem' }}>
                    <CardActionArea onClick={() => {}} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 0, height: '6rem' }}>
                        <ThumbUpIcon sx={{ fontSize: 48, color: '#00aa00' }} />
                    </CardActionArea>
                    <Divider orientation="vertical" variant="middle" />
                    <CardActionArea onClick={() => {}} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 0, height: '6rem' }}>
                        <ThumbDownIcon sx={{ fontSize: 48, color: '#dd2222' }} />
                    </CardActionArea>
                </CardContent>
            </Card>
        </>
        );
} 

export function Carousel(props) {

    var hover = false;

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

    const handleVote = (vote) => {
        if(vote) {
            
        }
        props.totalVotes ++;
    }
  
      return (
        <div onMouseOver={() => {hover = true}} onMouseLeave={() => {hover = false}} id='car' style={{width: '100%', minHeight: '25rem', display: 'flex', overflowX: 'scroll', scrollSnapType: 'x mandatory', }}>
            {(props.items.length === 1) 
            ? 
            <div style={{ marginRight: 'auto', marginLeft: 'auto' }}>
                <CarouselItem step={props.items[0]}></CarouselItem>
            </div>
            :
            <>
            <div className='car-spacer' style={{ backgroundColor: 'white', minWidth: '15%' }} />
            {props.items.map((step, index) => (
                <div key={index} className='car-item' style={{ backgroundColor: '#ffffff', minWidth: '45%', scrollSnapAlign: 'center', borderRadius: 10, marginRight: 8, marginLeft: 8 }}>
                    {(props.type == 'poll') ? 
                    <PollItem choice={step}></PollItem>
                    :
                    <CarouselItem step={step}></CarouselItem>
                    }
                </div>
            ))}
            <div className='car-spacer' style={{ backgroundColor: 'white', minWidth: '15%' }} />
            </>
            }
        </div>
      );
  }