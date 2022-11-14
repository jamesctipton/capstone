import React, { useState } from 'react';
import { 
  createTheme, 
} from '@mui/material';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { FormControlLabel, FormGroup, IconButton } from '@material-ui/core';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

const url = 'http://127.0.0.1:5000/join-create'
const theme = createTheme({
  palette: {
    primary: {
      main: '#CF7D30',
      darker: '#BE6C20'
    }
  }
});


const JoinCreate = (props) => {

    return (
        <div style={{display: 'grid', gridTemplateColumns: '1fr 3px 1fr', marginTop: '2%'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Typography variant='h4' sx={{fontWeight: 'bold', color: '#CF7D30', marginBottom: '13%'}}>Join Group</Typography>
                <Typography variant='h6' sx={{marginBottom: '2%'}}>Please enter 4 digit group code</Typography>
                <TextField
                    variant='outlined'
                    placeholder='Code'
                ></TextField>
                <Button 
                type='submit'
                variant="outlined"
                sx={{m: 1, borderWidth: 3, borderRadius: 30, background: 'rgba(207, 125, 48, 0.31)', fontWeight: 600, whiteSpace: 'nowrap', minWidth: 'maxContent', width: 150, height: 50, fontSize: 15, marginTop: '10%'}}
                size="large"
              >Submit</Button>
            </div>
                <Divider orientation='vertical' variant='middle' flexItem sx={{color: '#CF7D30'}}></Divider>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant='h4' sx={{fontWeight: 'bold', color: '#CF7D30'}}>Create Group</Typography>
                <IconButton
                    onClick={() => {}}
                >
                    <PersonOutlineOutlinedIcon fontSize='large' sx={{width: 80, height: 80}} />
                </IconButton>
                <Typography variant='a' sx={{color:'#aaaaaa', marginBottom: '1%'}}>Upload Photo</Typography>
                <TextField
                    variant='outlined'
                    sx={{textAlign: 'center'}}
                    placeholder='Group Name'
                    helperText="Please enter a name for your group"
                ></TextField>
                <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked color='warning' />} label="Private" />
                    <Typography variant='p'>*Public means everyone in the group can invite others</Typography>
                    <Typography variant='p'>Private means only the administrators can.</Typography>
                </FormGroup>
                <Button 
                    type='submit'
                    variant="outlined"
                    sx={{m: 1, borderWidth: 3, borderRadius: 30, background: 'rgba(207, 125, 48, 0.31)', fontWeight: 600, whiteSpace: 'nowrap', minWidth: 'maxContent', width: 150, height: 50, fontSize: 15}}
                    size="large"
                >Create</Button>
            </div>
        </div>
  )};
  
  export default JoinCreate;