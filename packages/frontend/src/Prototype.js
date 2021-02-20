import React from "react";
import { Post } from "./Components/Post";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route } from "react-router-dom";
import { auth, useUser, remote } from './api';
import config from './config';
import ProfileSidebar from "./Components/ProfileSidebar";

function App() {
  const user = useUser();
  const handleb = async () => {
    await auth.signOut(config.tests);
  };

  const getHome = () => {
    if (user === undefined) return <></> // Loading
    else if (user) return <ProfileSidebar /> // Signed Out
    else return <SignIn />

  }

  return (
    <>
    <CssBaseline />
    <BrowserRouter>
        <div>
            <Route path="/" exact component={Home} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
        </div>
        {/*<button onClick={handleb}>button</button>*/}
    </BrowserRouter>
    </>


  );
}

export default App;
