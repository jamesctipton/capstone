import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import { 
    InputAdornment,
    Button,
    createTheme,
    Box,
    Typography
} from '@mui/material';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import { Link, useNavigate } from "react-router-dom";
import { 
    FormControlLabel, 
    FormGroup, 
    IconButton 
} from '@material-ui/core';
import axios from 'axios';


const join_url = 'http://127.0.0.1:5000/join'
const theme = createTheme({
  palette: {
    primary: {
      main: '#CF7D30',
      darker: '#BE6C20'
    }
  }
});


const JoinCreate = (isLoggedIn) => {

    const navigate = useNavigate()
    const navigateGroupHome = (groupCode) => {
        navigate('/trip/' + groupCode)
    }

    const [groupCode, setGroupCode] = useState("")
    const [errorValue, setError] = useState({
        message: "",
        result: false
    })

    const verifyGroup = (event) => {
        axios.post(join_url, {
            hashCode: groupCode
        }).then((response) => {
            if(response['data']['resultStatus'] === 'SUCCESS') {
                console.log(response)
                navigateGroupHome(groupCode)
            } else {
                console.log(response)
                setError({message: response['data']['message'], result: true})
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 3px 1fr', marginTop: '10%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant='h3' sx={{ color: '#CF7D30', marginBottom: '13%' }}>Join Group</Typography>
                <Typography variant='h6' sx={{ marginBottom: '6%', alignItems: 'center' }}>Please enter the group's 4 digit code</Typography>
                <TextField
                    variant='outlined'
                    placeholder='Code'
                    value={groupCode}
                    onChange={(e) => setGroupCode(e.target.value)}
                    sx={{ width: '65%', paddingBottom: 5 }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start" sx={{ marginLeft: '42%' }}></InputAdornment>
                    }}
                    required
                ></TextField>
                {(groupCode.length === 4) ?
                    <Button 
                        type='submit'
                        variant="outlined"
                        sx={{ m: 1, borderWidth: 3, borderRadius: 30, background: 'rgba(207, 125, 48, 0.31)', fontWeight: 600, whiteSpace: 'nowrap', minWidth: 'maxContent', width: '50%', height: 50, fontSize: 15, marginTop: '10%' }}
                        size="large"
                        onClick={() => verifyGroup(groupCode)}
                        //component={Link} to={"/trip/" + groupCode}
                    >Submit</Button>
                    :
                    <Button 
                        type='submit'
                        variant="outlined"
                        sx={{ m: 1, borderWidth: 3, borderRadius: 30, background: 'rgba(207, 125, 48, 0.31)', fontWeight: 600, whiteSpace: 'nowrap', minWidth: 'maxContent', width: '50%', height: 50, fontSize: 15, marginTop: '10%' }}
                        size="large"
                        component={Link} to={"/join-create"}
                    >Submit</Button>}
                    {errorValue.result ? 
                        <Box sx={{ border: '3px solid red', borderRadius: 3, background: 'rgba(255, 0, 0, 0.1)', borderColor: 'rgba(255, 0, 0, 0.86)', color: 'red', padding: 2, marginTop: 10 }}>
                        <Typography>{errorValue.message}</Typography>
                        </Box>
                    : <></> }
            </div>
                <Divider orientation='vertical' variant='middle' flexItem sx={{ background: '#CF7D30' }}></Divider>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h3' sx={{ color: '#CF7D30' }}>Create Group</Typography>
                <IconButton
                    onClick={() => {}}
                >
                    <PersonPinIcon color='primary' sx={{ width: 90, height: 90 }} />
                </IconButton>
                <TextField
                    variant='outlined'
                    sx={{ width: '65%' }}
                    placeholder='Group Name'
                    helperText="*Please enter a name for your group"
                    InputProps={{
                        startAdornment: <InputAdornment position='start' sx={{ marginLeft: '35.5%' }}></InputAdornment>
                    }}
                    FormHelperTextProps={{
                        style: {
                            color: 'black',
                            fontWeight: 400
                        }
                    }}
                    required
                ></TextField>
                <FormGroup style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap: 100, paddingLeft: 25, paddingBottom: 5 }}>
                    <Typography variant='h7' >*Private or Public group</Typography>
                    <FormControlLabel control={<Switch defaultChecked color='warning' />} />
                </FormGroup>
                <Typography variant='p' style={{ textAlign: 'center', fontSize: 'small', paddingLeft: 10, paddingRight: 10 }}>Public means everyone in the group can invite others, Private means only selected persons can</Typography>
                <Button 
                    type='submit'
                    variant="outlined"
                    sx={{ m: 1, borderWidth: 3, borderRadius: 30, background: 'rgba(207, 125, 48, 0.31)', fontWeight: 600, whiteSpace: 'nowrap', minWidth: 'maxContent', width: '50%', height: 50, fontSize: 15 }}
                    size="large"
                    
                >Create Group</Button>
            </div>
        </div>
  )};
  
  export default JoinCreate;