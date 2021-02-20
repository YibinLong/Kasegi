import { Button, AppBar, Toolbar } from '@material-ui/core';
import { useUser, auth } from '../api';
export const Navbar = () => {
  const user = useUser();

  return (
    <AppBar>
      <Toolbar>
        { 
          user && 
          <Button 
            color="inherit"
            onClick={() => auth.signOut()}
          >
            Sign Out
          </Button> 
        }
      </Toolbar>
    </AppBar>
  )
}