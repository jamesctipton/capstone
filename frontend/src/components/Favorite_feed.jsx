import React, {useState} from 'react'
import { Box , Stack,Skeleton} from "@mui/material"
import Post from "./Post"
import  SecondPost from './SecondPost'
import ThirdPost from './ThirdPost'
import Post_4th from './Post_4th'

const Favorite_feed = () => {

  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, [3000]);


  return (

      <Box flex = {4} p = { 2}>
              <Box flex={4} p={{ xs: 0, md: 2 }}>
      {loading ? (
        <Stack spacing={1}>
          <Skeleton variant="text" height={100} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="text" height={20} />
          <Skeleton variant="rectangular" height={300} />
        </Stack>
      ) : (
        <>
          <Post />
          <SecondPost />
          <ThirdPost />
          <Post_4th /> 
        </>
      )}
    </Box>

      </Box>

  )
}

export default Favorite_feed
