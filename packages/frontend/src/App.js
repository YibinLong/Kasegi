import React from "react";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route } from "react-router-dom";
import { useUser } from './api';
import { Dashboard } from "./Pages/Dashboard";
import { Profile } from "./Pages/Profile";


function App() {
  const user = useUser();
  console.log('user', user);

  const getHome = () => {
    if (user === undefined) return <></> // Loading
    else if (user) return <Dashboard /> // Signed Out
    else return <SignIn />
  }

  return (
    <>
    <CssBaseline />
    <BrowserRouter>
      <Route path="/" exact component={getHome} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/:id" component={Profile} />
    </BrowserRouter>
    </>

  );
}

export default App;
