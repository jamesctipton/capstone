import React from 'react';
import { Typography } from '@mui/material';
import { Box } from '@material-ui/core';
import { Poll } from '../../components/Poll';

const Trip = (props) => {
  const user = JSON.parse(localStorage.getItem('user'))

  const groupCode = window.location.href.substr(window.location.href.lastIndexOf('/') + 1) 

  const group = user.groups.filter(object => {
    return object.groupCode === groupCode
  })[0]
  console.log(group)

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <article style={{  }}>
          <img src={group.groupimage} alt="group" style={{ opacity: 0.25, minWidth: '150%', height: 500, borderRadius: 20, display: 'block', overflowY: 'clip', marginLeft: '-25%' }} />
          <h1 style={{ fontSize: 80, color: '#CF7D30', textAlign: 'center', position: 'absolute', top: 0, bottom: 400, left: 0, right: 0, height: 'fit-content', fontWeight: 400, margin: 'auto', textShadow: '#444 0px 0px 2px,   #444 0px 0px 2px,   #444 0px 0px 2px, #444 0px 0px 2px,   #444 0px 0px 2px,   #444 0px 0px 2px' }}>{group.groupname}</h1>
          <h2 style={{ fontSize: 30, color: '#222222', textAlign: 'center', position: 'absolute', top: 0, bottom: 200, left: 0, right: 0, height: 'fit-content', margin: 'auto' }}>{group.date === '' ? group.date : 'No Date Selected Yet'}</h2>
        </article>
      </div>
      <Box sx={{marginTop: '3%'}}>
          {(group.polls) ?
          <>
            {group.polls.map((p, i) => (
              <Poll
                key={i}
                options={p.options}
                totalVotes={p.totalVotes}
                pollCode={p.pollCode}
                category={p.pollCategory}
              ></Poll> 
            ))} 
          </>
          : <Typography variant='h6' sx={{ width: '100%', textAlign: 'center', color: '#CF7D30' }}>You have no polls</Typography>
        }
      </Box>
    </div>
  )};
  
  export default Trip;