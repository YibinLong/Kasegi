import React from "react";
import {Post} from "./Components/Post";
import SignIn from "./Pages/SignInPage/SignIn";
import SignUp from "./Pages/SignUpPage/SignUp";
import CssBaseline from '@material-ui/core/CssBaseline';


import Button from '@material-ui/core/Button';

import { BrowserRouter, Route } from "react-router-dom";
import { auth, useUser, db } from './api';

import ProfileSidebar from "./Components/ProfileSidebar";


function App() {
  const user = useUser();
  React.useEffect(() => {
    if (user) {
      db.listPosts()
        .then((posts) => {
          posts.forEach(post => console.log(post.data()));
        });
    } else {
      auth.signIn()
    }
  }, [user])

  return (
    <>
    <CssBaseline />
    <BrowserRouter>
        <div>
            <Route path="/" exact component={ProfileSidebar} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
        </div>
    </BrowserRouter>
    </>

  );
}

export default App;
