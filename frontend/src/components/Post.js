import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";

import Paris from '../assets/paris.jpeg';

const Post = () => {
  return (
    <Box>
        <Typography sx={{width: '100%', textAlign: 'center', 
        fontWeight: 'bold',
         color: '#CF7D30', mb: 1}} variant='h3'>Favorites</Typography>
         
    <Card>
        {/* <Box>
        <Typography sx={{width: '100%', textAlign: 'center', 
        fontWeight: 'bold',
         color: '#CF7D30', mb: 1}} variant='h3'>Favorites</Typography>
         </Box> */}
    <Card sx={{ margin: 5 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="Paris"
        subheader="France"
      />
      <CardMedia
        component="img"
        height="20%"
        width="5%"
        src = {Paris}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            Paris
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
          />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>
    </Card>
</Card>
</Box>
  );
};

export default Post;