import { Grid, Container } from '@material-ui/core';
import React from 'react';
import { useUser } from '../../api'; 
import { Wall } from '../../Components/Wall';

export const Dashboard = () => {
  const user = useUser();
  if (!user) return <></>;
  return (
    <Container 
      component="main"
      maxWidth="md"
      style={{marginTop: '2rem'}}
    >
      <Grid>
        <Wall />
      </Grid>
    </Container>
  )
}