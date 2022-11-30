import React from 'react'
import Sidebar from '../../components/Sidebar';
import Favorite_feed from '../../components/Favorite_feed';
import Rightbar from '../../components/Rightbar';
import { Box, Container, Stack } from '@mui/material';

export default function Favorites () {
  return (
            <Box>
              <Stack direction='row' spacing ={10} justifyContent='space-between'>

                <Sidebar />
                <Favorite_feed />
                <Rightbar />
              </Stack>
              
            </Box>

    
 
  );
}
