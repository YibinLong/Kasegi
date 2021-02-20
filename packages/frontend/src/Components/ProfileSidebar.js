import React, {useState} from "react";

import Container from '@material-ui/core/Container';
import { Grid, Paper, Typography } from "@material-ui/core";



const ProfileSidebar = (props) => {

    return (
        <div>
            <Typography>
                Christopher Liu 
            </Typography>

            <Grid container justify="center" >
                <Grid item>
                    <Paper>
                        <Typography>
                            Following
                        </Typography>
                        <Typography>
                            0
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper>
                        <Typography>
                            Followers
                        </Typography>
                        <Typography justify="center" align-self="center">
                            0
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item>
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
        </div>
    );

};

export default ProfileSidebar;