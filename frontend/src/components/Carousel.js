import React from "react";
import { Box, Card, CardActionArea } from "@mui/material";
import { CardContent, CardMedia, Typography } from "@material-ui/core";

//item:  {
//     name: string,
//     description: string,
//     imgPath?: string,
//     linkHash: string,
//     users: int
// }

export function Carousel(props) {
  
    var hover = false;

    setInterval(() => {
        var elem = document.getElementById('car');
        var carItems = (document.querySelectorAll('#car .car-item').length > 2) ? document.querySelectorAll('#car .car-item').length : 10;
        if(elem) {
            if(!hover) {
                // console.log(elem.scrollWidth)
                // console.log(elem.scrollLeft)
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
        <div onMouseOver={() => {hover = true}} onMouseLeave={() => {hover = false}} id='car' style={{width: '100%', minHeight: '25rem', display: 'flex', overflowX: 'scroll', scrollSnapType: 'x mandatory'}}>
            <div className='car-spacer' style={{ backgroundColor: 'white', minWidth: '15%' }}></div>
            {props.items.map((step, index) => (
                <div key={index} className='car-item' 
                style={{ 
                    backgroundColor: '#eeeeee', 
                    minWidth: '45%', 
                    scrollSnapAlign: 'center',
                    borderRadius: 10,
                    marginRight: 8,
                    marginLeft: 8
                    }}>
                    <>
                        <Card sx={{ borderRadius: '10px', backgroundColor: '#dddddd', }}>
                            <CardActionArea onMouseOver={() => {hover = true}} onMouseLeave={() => {hover = false}} href={'trip/' + step.linkHash}>
                                <div style={{ position: 'absolute', zIndex: 100, backgroundColor: '#ffffff', borderRadius: 100, width: 'auto', textAlign: 'center', padding: 12, margin: 16, right: 0 }} >
                                    {step.users} people
                                </div>
                                {(step.imgPath == '' || step.imgPath == null) ?
                                <div
                                    style={{ backgroundColor: '#666666', height: '20rem', color: '#dddddd', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontSize: 40, }}
                                >No image
                                </div>
                                :
                                <CardMedia
                                    component='img'
                                    height='294rem'
                                    image={step.imgPath}
                                    alt={step.name}
                                />
                                }
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component='div'>{step.name}</Typography>
                                    <Typography variant='body'>{step.description}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </>
                </div>
            ))}
            <div className='car-spacer' style={{ backgroundColor: 'white', minWidth: '15%' }}></div>
        </div>
      );
  }