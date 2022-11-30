import React from 'react'
import {
    Avatar,
    AvatarGroup,
    Box,
    Grid,
    Paper,
    Typography,
  } from "@mui/material";
  import DeleteIcon from '@mui/icons-material/Delete';
  import { styled } from '@mui/material/styles';
  
  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 600,
    color: theme.palette.text.primary,
  }));



export default function Friends() {
  return (
    <Box flex={1} p={2} sx={{display: {xs:'none',sm:"block"}}}>
        <Typography sx={{width: '100%', textAlign: 'start', 
        fontWeight: 'bold',
         color: '#CF7D30', mb: 1}} variant='h3'>Friends</Typography>
         <Box>
         <AvatarGroup max={4}>
            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
            <Avatar alt="Travis Howard" src="https://material-ui.com/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/3.jpg" />
            <Avatar alt="Agnes Walker" src="https://material-ui.com/static/images/avatar/4.jpg" />
           <Avatar alt="Trevor Henderson" src="https://material-ui.com/static/images/avatar/5.jpg" />
           </AvatarGroup>
        </Box>
        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
      <StyledPaper
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
      >
        <Grid container sx={{ width: 300 }} wrap="nowrap" spacing={5}>
          <Grid item>
            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg"></Avatar>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography Wrap>Anti</Typography>
            <Typography></Typography>
            
            {/* <ListItem
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  </ListItem> */}

          </Grid>
        </Grid>
      </StyledPaper>
      <StyledPaper
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
      >
        <Grid container wrap="nowrap" spacing={5}>
          <Grid item>
            <Avatar alt="Agnes Walker" src="https://material-ui.com/static/images/avatar/4.jpg"  ></Avatar>
          </Grid>
          <Grid item xs>
            <Typography noWrap>James </Typography>
          </Grid>
        </Grid>
      </StyledPaper>
      <StyledPaper
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
      >
        <Grid container wrap="nowrap" spacing={5}>
          <Grid item>
            <Avatar alt="Agnes Walker" src="https://material-ui.com/static/images/avatar/3.jpg" ></Avatar>
          </Grid>
          <Grid item xs>
            <Typography>Kent</Typography>
          </Grid>
        </Grid>

        
      </StyledPaper>

      <StyledPaper
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
      >
        <Grid container wrap="nowrap" spacing={5}>
          <Grid item>
            <Avatar alt="Agnes Walker" src="https://material-ui.com/static/images/avatar/4.jpg"  ></Avatar>
          </Grid>
          <Grid item xs>
            <Typography noWrap>John</Typography>
          </Grid>
        </Grid>
      </StyledPaper>


      <StyledPaper
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
      >
        <Grid container wrap="nowrap" spacing={5}>
          <Grid item>
            <Avatar alt="Agnes Walker" src="https://material-ui.com/static/images/avatar/4.jpg"  ></Avatar>
          </Grid>
          <Grid item xs>
            <Typography noWrap>Kevin</Typography>
          </Grid>
        </Grid>
      </StyledPaper>

      <StyledPaper
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
      >
        <Grid container wrap="nowrap" spacing={5}>
          <Grid item>
            <Avatar alt="Agnes Walker" src="https://material-ui.com/static/images/avatar/4.jpg"  ></Avatar>
          </Grid>
          <Grid item xs>
            <Typography noWrap>James</Typography>
          </Grid>
        </Grid>
      </StyledPaper>


    </Box>
        
    </Box>
    
  )
}
