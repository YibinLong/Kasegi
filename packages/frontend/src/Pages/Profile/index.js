import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { db } from '../../api';

export const Profile = () => {
  const [ profile, setProfile ] = React.useState({});
  const params = useParams();

  useEffect(() => {
    db.getUser(params.id).then(setProfile);
  }, [params.id])

  return (
    <div>
      <h1>{profile.name}</h1>
      <Button>Request Friend</Button>
    </div>
  )
}