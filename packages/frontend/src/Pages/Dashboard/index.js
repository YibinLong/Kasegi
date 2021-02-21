import { Grid, Container } from '@material-ui/core';
import React from 'react';
import { useAuth } from '../../api'; 
import { Wall } from '../../Components/Wall';

export const Dashboard = () => {
  const auth = useAuth();
  if (!auth.current) return <></>;
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