import { Button, AppBar, Toolbar } from '@material-ui/core';
import { useAuth } from '../api';
export const Navbar = () => {
  const auth = useAuth();

  return (
    <AppBar position="relative">
      <Toolbar>
        { 
          auth.current && 
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