import './Home.css'
import React from 'react';
import { Button, Typography } from '@mui/material';
import Steps from '../../assets/Steps.png'
import { Link } from "react-router-dom";
import { Carousel } from '../../components/Carousel';
import { Poll } from '../../components/Poll';

const Home = () => {

  const user = JSON.parse(localStorage.getItem('user'))

  const trips = (user) ? ((user.groups) ? user.groups.length : 0) : 0

  const pollOptions = [
    {name: 'first', votes: 0},
    {name: 'second', votes: 1},
    {name: 'third', votes: 1},
  ]

  let polls = []

  // if user exists
  if(user != null) {
    try {
      if( user.groups.length !== 0 && !(Object.keys(user).length === 0 && user.constructor === Object)) {
        for (let i = 0; i < user.groups.length; i++) {
          const group = user.groups[i];
          if(group.polls) {
            group.polls.sort(function(a, b) {
              var x = a['pollCategory']; var y = b['pollCategory'];
              return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            })
            for (let j = 0; j < group.polls.length; j++) {
              const p = group.polls[j];
              polls.push(p)
            }
          } 
        }
      }
    } catch {
      
    }
  }

  return (
      <>
        {(user) 
          ? 
          <>
          {(trips === 0) ?
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '16%'}}>
              <Typography sx={{width: '100%', textAlign: 'center', fontWeight: 'bold', color: '#CF7D30', mb: 1}} variant='h3'>You Have No Trips</Typography>
              <Typography sx={{width: '100%', textAlign: 'center', fontWeight: 'bold', color: '#666666', mb: 1}} variant='h5'>Click <a href='join-create'>Here</a> to create or join one</Typography>
            </div>   
            :
            <>
              <div id='carousel-container'>
              {(trips>0) ? 
                <div>
                  <Typography sx={{width: '100%', textAlign: 'center', fontWeight: 'bold', color: '#CF7D30', mb: 1, paddingBottom: '3%'}} variant='h2'>Your Trips</Typography>
                  <Carousel
                    items={user.groups}
                    user={user}
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
              {(polls.length === 0) ?
              <Poll
                options={pollOptions}
                title="Active Polls"
              ></Poll>
              :
              <>
                <Typography sx={{width: '100%', textAlign: 'center', fontWeight: 'bold', color: '#CF7D30', mb: 1}} variant='h2'>Active Polls</Typography>
                {polls.map((p, i) => (
                <Poll
                  key={i}
                  options={p.options}
                  totalVotes={p.totalVotes}
                  pollCode={p.pollCode}
                  category={p.pollCategory}
                ></Poll> 
                ))} 
              </>
              }
            </>
            }
          </>
          :
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', margin: '10px 0 40px 0', marginTop: '2%'}}>
            <Typography sx={{width: '100%', textAlign: 'center', fontWeight: 'bold', color: '#CF7D30', mb: 1}} variant='h2'>How Frí Works</Typography>
            <img src={Steps} alt="Steps" style={{width: '90%', marginBottom: '1%'}}></img>
            <Typography variant='h6' sx={{color: '#CF7D30'}}>Don't have an account? <a href='/register'>Register</a> or 
            <span>
              <Button
                variant='outlined'
                sx={{m: 1, borderWidth: 3, borderRadius: 30, background: 'rgba(207, 125, 48, 0.31)', fontWeight: 600, whiteSpace: 'nowrap', minWidth: 'maxContent', width: 100, height: 40, fontSize: 15}}
                component={Link} to="/login"
                >Log In</Button>
              </span>
            </Typography>
          </div> 
        }
      </>
    );
  };
  
  export default Home;