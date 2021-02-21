import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { useAuth } from './api';
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { Dashboard } from "./Pages/Dashboard";
import { Profile } from "./Pages/Profile";
import { Navbar } from './Components/Navbar';


function App() {
  const auth = useAuth();
  const getHome = () => {
    if (auth.current === undefined) return <></> // Loading
    else if (auth.current) return <Dashboard /> // Signed Out
    else return <SignIn />
  }

  return (
    <>
    <CssBaseline />
    <Navbar/>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={getHome} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/profile/:id" component={Profile} />
      </Switch>
    </BrowserRouter>
    </>

  );
}

export default App;
