import React from "react";
import { Card, CardActionArea } from "@mui/material";
import { CardContent, CardMedia, Typography } from "@material-ui/core";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

//item:  {
//     name: string,
//     description: string,
//     imgPath?: string,
//     linkHash: string,
//     users: int
// }

function CarouselItem(props) {
    var step = props.step // item type
    return (
    <>
        <Card sx={{ borderRadius: '10px', backgroundColor: '#dddddd',}}>
            <CardActionArea href={'trip/' + step.linkHash}>
                <div style={{ position: 'absolute', zIndex: 100, backgroundColor: '#ffffff', opacity: 0.8, borderRadius: 100, width: 'auto', textAlign: 'center', padding: 12, margin: 16, right: 0 }} >
                    {(step.users == 0 || step.users == null) ? '' : step.users + ' people'}
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

// pollItem: {
//     choice: string
//     votes: int
//     imgPath: string
// }

function PollItem(props) {
    var step = props.step; // temp
    return (
        <>
            <Card sx={{ borderRadius: '10px', backgroundColor: '#dddddd',}}>
                <div style={{ position: 'absolute', zIndex: 100, backgroundColor: '#ffffff', opacity: 0.8, borderRadius: 100, width: 'auto', textAlign: 'center', padding: 12, margin: 16, right: 0 }} >
                    {(step.users == 0 || step.users == null) ? '' : step.users + ' people'}
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
                    <CarouselItem step={step}></CarouselItem>
                </div>
            ))}
            <div className='car-spacer' style={{ backgroundColor: 'white', minWidth: '15%' }} />
            </>
            }
        </div>
      );
  }