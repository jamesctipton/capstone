import React, { useState } from 'react';
import './ForgotPassword.css';
import { ThemeProvider, createTheme } from '@material-ui/core';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';


const theme = createTheme({
    palette: {
      primary: {
        main: '#CF7D30',
        darker: '#BE6C20',
      }
    }
  });

const ForgotPassword = () => {

    const [emailValue, setEmail] = useState("")

    return (
        <ThemeProvider theme={theme}>
            <div id='flexbox'>
                <svg id='logo' width="494" height="144" viewBox="0 0 494 144" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_195_137)"><path d="M49.4 60.3601H172.9" stroke="#CF7D30" strokeWidth="6"/><path d="M319.453 60.3601H442.953" stroke="#CF7D30" strokeWidth="6"/><path d="M82.3334 84.8401H172.9" stroke="#CF7D30" strokeWidth="6"/><path d="M319.453 84.8401H410.02" stroke="#CF7D30" strokeWidth="6"/><path d="M469 3H25C12.8497 3 3 12.8497 3 25V119C3 131.15 12.8497 141 25 141H469C481.15 141 491 131.15 491 119V25C491 12.8497 481.15 3 469 3Z" stroke="#CF7D30" strokeWidth="6"/><path d="M213.428 56.9361V70.6321H230.772V77.5121H213.428V96.3601H204.788V50.0881H233.972V56.9361H213.428ZM255.022 72.1041C256.643 72.1041 258.051 71.9014 259.246 71.4961C260.462 71.0908 261.454 70.5361 262.222 69.8321C263.011 69.1068 263.598 68.2534 263.982 67.2721C264.366 66.2908 264.558 65.2134 264.558 64.0401C264.558 61.6934 263.779 59.8908 262.222 58.6321C260.686 57.3734 258.328 56.7441 255.15 56.7441H249.646V72.1041H255.022ZM277.166 96.3601H269.39C267.918 96.3601 266.851 95.7841 266.19 94.6321L256.462 79.8161C256.099 79.2614 255.694 78.8668 255.246 78.6321C254.819 78.3974 254.179 78.2801 253.326 78.2801H249.646V96.3601H241.038V50.0881H255.15C258.286 50.0881 260.974 50.4187 263.214 51.0801C265.475 51.7201 267.32 52.6267 268.75 53.8001C270.2 54.9734 271.267 56.3814 271.95 58.0241C272.632 59.6454 272.974 61.4374 272.974 63.4001C272.974 64.9574 272.739 66.4294 272.27 67.8161C271.822 69.2028 271.16 70.4614 270.286 71.5921C269.432 72.7228 268.366 73.7148 267.086 74.5681C265.827 75.4214 264.387 76.0934 262.766 76.5841C263.32 76.9041 263.832 77.2881 264.302 77.7361C264.771 78.1628 265.198 78.6748 265.582 79.2721L277.166 96.3601ZM290.803 96.3601H282.163V50.0881H290.803V96.3601ZM300.051 36.8081L289.683 45.9601C289.256 46.3441 288.851 46.5788 288.467 46.6641C288.083 46.7494 287.592 46.7921 286.995 46.7921H281.267L287.955 38.1201C288.168 37.8214 288.381 37.5867 288.595 37.4161C288.808 37.2241 289.043 37.0854 289.299 37.0001C289.555 36.9147 289.832 36.8614 290.131 36.8401C290.451 36.8187 290.824 36.8081 291.251 36.8081H300.051Z" fill="#CF7D30"/></g><defs><clipPath id="clip0_195_137"><rect width="494" height="144" fill="white"/></clipPath></defs></svg>
                <Typography variant='h2' color='primary' fontWeight={500} fontSize={50}>Forgot Password</Typography>
                <br></br>
                <Typography variant='h3' color='primary.darker' fontWeight={300} fontSize={25}>Please enter the email associated with your account</Typography>
                <br></br>
                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    value={emailValue}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{width: '60%'}}
                    inputProps={{style: {fontSize: 20}}}
                    InputLabelProps={{style: {fontSize: 20}}}
                    size='large'
                    required
                ></TextField>
                <div id='buttons'>
                    <Button
                        id='cancelButton' 
                        variant="outlined"
                        sx={{m: 1, borderWidth: 3, borderRadius: 30, fontWeight: 600, whiteSpace: 'nowrap', minWidth: 'maxContent', width: 300, height: 70, fontSize: 20}}
                        size="large"
                        component={Link} to="/forgot-password"
                    >Cancel</Button>
                    <Button 
                        id='sendCodeButton'
                        type='submit'
                        variant="outlined"
                        sx={{m: 1, borderWidth: 3, borderRadius: 30, background: 'rgba(207, 125, 48, 0.31)', fontWeight: 600, whiteSpace: 'nowrap', minWidth: 'maxContent', width: 300, height: 70, fontSize: 20}}
                        size="large"
                    >Send Code</Button>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default ForgotPassword;