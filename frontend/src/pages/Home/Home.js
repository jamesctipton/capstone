import './Home.css'
import React from 'react';
import { Button, Typography } from '@mui/material';
import Steps from '../../assets/Steps.png'
import { Link } from "react-router-dom";
import { Carousel } from '../../components/Carousel';
import { Poll } from '../../components/Poll';
import axios from 'axios'

const url = 'http://127.0.0.1:5000/group';

const items = [
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
]

const Home = (isLoggedIn, user) => {

  // get groups from user

  // axios.post(url, {
  //   user: user
  // }).then((response) => {
  //   if(response['data']['resultStatus'] === 'SUCCESS') {
  //     setError({message: "", result: false})
  //   }
  //   else {
  //     console.log(response)
  //     setError({message: "error caught", result: true})
  //   }
  // }).catch((error) => {
  //   console.log(error)
  // })

  const trips = items.length;

    return (
      <div>
        {(trips === 0) ?
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
                items={items}
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
          <Poll
            options={[
              {name: 'first', votes: 0},
              {name: 'second', votes: 1},
              {name: 'third', votes: 1},
            ]}
            ></Poll> 
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