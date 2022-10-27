import { createTheme, ThemeProvider, Button, InputAdornment, IconButton, OutlinedInput, InputLabel, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import TextField from '@mui/material/TextField';
import './Registration.css'
import React from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { FormControl } from '@mui/material';

const theme = createTheme({
    palette: {
      primary: {
        main: '#CF7D30',
        darker: '#BE6C20'
      }
    }
  });

const Submit = (event) => {
    return
};

const Registration = () => {

    const [values, setValues] = React.useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        confirmPassword: '',
        showPassword: false
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return <ThemeProvider theme={theme}>
    <div id='flexbox'> 
        {/* logo */}
        <Typography variant='h1' color='primary' fontWeight={400}>Register for FRÍ</Typography>
        <br></br>
        {/* <h1>Register to FRÍ</h1> */}
        <form id='main-form' onSubmit={Submit(this)}>
            <Grid container spacing={2}>
                <Grid xs={12} sm={5} item>
                    <TextField
                        placeholder="Enter first name"
                        onChange={handleChange('firstname')}
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        required
                    />
                </Grid>
                <Grid xs={12} sm={2} item>
                    <TextField
                        placeholder='Middle Initial'
                        label='M.I.'
                        variant='outlined'
                    />
                </Grid>
                <Grid xs={12} sm={5} item>
                    <TextField
                        placeholder="Enter last name"
                        onChange={handleChange('lastname')}
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        placeholder="Enter email"
                        onChange={handleChange('email')}
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        placeholder="Enter phone number"
                        onChange={handleChange('phone')}
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        placeholder="Username"
                        onChange={handleChange('username')}
                        label="Username"
                        variant="outlined"
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor='password-input'>Password *</InputLabel>
                        <OutlinedInput
                            id='password-input'
                            label="Password"
                            InputLabel="Password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            placeholder="Enter Password"
                            variant="outlined"
                            fullWidth
                            required
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='show/hide password'
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        >Password</OutlinedInput>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor='re-pass-input'>Confirm Password *</InputLabel>
                    <OutlinedInput
                        id='re-pass-input'
                        label="confirm password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        placeholder="Re-Enter your Password"
                        variant="outlined"
                        fullWidth
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='show/hide password'
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                            </InputAdornment>
                        }
                    >Confirm Password</OutlinedInput>
                    </FormControl>
                </Grid>
                <div id='buttons'>
                <Button 
                variant="outlined"
                sx={{m: 1}}
                size="large"
                href='/login'
                >Cancel</Button>
                <Button 
                type='submit'
                variant="outlined"
                sx={{m: 1}}
                size="large"
                disabled={!(values.firstname && values.lastname && values.email && values.phone && values.username && values.password && values.confirmPassword)}
              >Register</Button>
              </div>
            </Grid>
        </form>
  </div>

</ThemeProvider>
};
  
  export default Registration;