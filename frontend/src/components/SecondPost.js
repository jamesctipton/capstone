import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
  
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";

import cali from '../assets/cali.jpeg';

const secondPost = () => {
  return (
    <Card>
    <Card sx={{ margin: 5 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="California"
        subheader="USA"
      />
      <CardMedia
        component="img"
        height="20%"
        width="5%"
        src = {cali}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            Cali
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

  );
};

export default secondPost;