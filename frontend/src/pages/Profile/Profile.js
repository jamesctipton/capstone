import React from 'react'
import { Box, Divider, Typography, List, ListItem, Button, Card } from "@mui/material";
import { Link } from 'react-router-dom';

const Profile = () => {
    
    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
            <Card>
                <List>
                    <ListItem>
                        <Typography variant='h3'>Name: {user.firstname}</Typography>
                    </ListItem>
                    <Divider variant='middle' />
                    <ListItem>
                        <Typography variant='h3'>Email: {user.email}</Typography>
                    </ListItem>
                    <Divider variant='middle' />
                    <ListItem>
                        <Button component={Link} to='/forgot-password' fullWidth>Change Password</Button>
                    </ListItem>
                </List>
            </Card>
        </Box>
    );
}

export default Profile;