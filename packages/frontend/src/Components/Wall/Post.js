import React, {useState} from 'react';
import { 
  Card, 
  CardHeader,
  CardContent, 
  CardActions, 
  Button, 
  Typography, 
  Box,
} from '@material-ui/core';

export const Post = (props) => {
  const [likes, setLikes] = useState(0);
  const addLike = () => {
    setLikes(likes+1);
  };
  console.log(props.post);
  const { name, message, timestamp } = props.post;

  return (
    <Card className="Post">
      <CardHeader>
        {name}
      </CardHeader>
      <CardContent>
        <Typography gutterBottom>
          {message}
        </Typography>
      </CardContent>
      <CardActions>
        <Box 
          display="flex" 
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          <Typography>
            {timestamp.toDate().toLocaleString()}
          </Typography>
          <Box display="flex">
            <p>Likes: {likes}</p>
            <Button onClick={addLike}><div className="fas fa-heart" /></Button>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );

};