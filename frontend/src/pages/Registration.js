import { createTheme, ThemeProvider, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import './Registration.css'

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
    return <ThemeProvider theme={theme}>
    <div id='flexbox'> 
        <h1>Register to FRÍ</h1>
        <form onSubmit={Submit(this)}>
            <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                    <TextField
                        placeholder="Enter first name"
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        required
                    />
                </Grid>
                <Grid xs={12} sm={6} item>
                    <TextField
                        placeholder='Middle Initial'
                        label='M.I.'
                        variant='outlined'
                        required
                    />
                </Grid>
                <Grid xs={12} sm={6} item>
                    <TextField
                        placeholder="Enter last name"
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        placeholder="Enter email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        placeholder="Enter phone number"
                        label="Phone"
                        variant="outlined"
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        placeholder="Username"
                        label="Username"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Password"
                        placeholder="Password"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Re-enter Password"
                        placeholder="Re-enter Password"
                        variant="outlined"
                        fullWidth
                    />
                </Grid>
                
            </Grid>
        </form>
  </div>
</ThemeProvider>
};
  
  export default Registration;