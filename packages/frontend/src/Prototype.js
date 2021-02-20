import React from "react";
import { Post } from "./Components/Post";
import SignIn from "./Pages/SignInPage/SignIn";
import SignUp from "./Pages/SignUpPage/SignUp";
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route } from "react-router-dom";
import { auth, useUser, remote } from './api';
import config from './config';

function App() {
  const user = useUser();
  const handleb = async () => {
    await auth.signIn(config.tests);
    remote.changeName('Pee Toilet');
  };

  return (
    <>
    <CssBaseline />
    <BrowserRouter>
        <div>
            <Route path="/" exact component={Post} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
        </div>
        <button onClick={handleb}>button</button>
    </BrowserRouter>
    </>


  );
}

export default App;
