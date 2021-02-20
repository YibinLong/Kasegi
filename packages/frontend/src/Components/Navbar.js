import { Button, Navbar } from '@material-ui/core';
import { useUser } from '../api';
export const Nav = () => {
  const user = useUser();

  return (
    <Navbar>
      { user && <Button>Sign Out</Button> }
    </Navbar>
  )
}