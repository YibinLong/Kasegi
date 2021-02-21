import React, {useState} from "react";

import Container from '@material-ui/core/Container';
import { Grid, Paper, Typography } from "@material-ui/core";
import { useUser } from '../api';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', 
  }
})
);

const ProfileSidebar = (props) => {
  const classes = useStyles();
  const user = useUser();

  return (
    <div className={classes.paper}>
      <Typography>
        {user && user.name}
      </Typography>

      <Grid container spacing={2} xs={12} fullWidth="true" >
        <Grid item xs={4} fullWidth="true">
          <Paper>
            <Typography>
              Following
            </Typography>
            <Typography xs={4} gutterBottom={true}>
              0
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={4}>
          <Paper>
            <Typography>
              Followers
            </Typography>
            <Typography>
              0
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={4}>
          <Paper>
            <Typography>
              Posts
            </Typography>
            <Typography>
              0
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container direction="column" justify="space-between" spacing={3}>
        <Grid item>
          <Paper>
            <Typography>
              [How much money I saved this month]
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item> 
          <Paper>
            <Typography>
              [How much money I saved all time]
            </Typography>
          </Paper>
        </Grid>
        <Grid>
          <Paper>
            <Typography gutterBottom={true}>
              [My milestones]
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );

};

export default ProfileSidebar;