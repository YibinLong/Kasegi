import React, {useState} from "react";

import Container from '@material-ui/core/Container';
import { Grid, Paper, Typography } from "@material-ui/core";
import { useUser } from '../api';



const ProfileSidebar = (props) => {
    const user = useUser();

    return (
        <div>
            <Typography>
                {user && user.name}
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