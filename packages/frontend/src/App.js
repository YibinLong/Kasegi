import React, {useState} from "react";

import {Post} from "./Components/Post";
import SignIn from "./Pages/SignInPage/SignIn";
import SignUp from "./Pages/SignUpPage/SignUp";

import Button from '@material-ui/core/Button';

import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    
    /*
    <div>
        
        <h1>Kasegi</h1>
        <Post name="Eric Song"/>
        <Post name="Chris Liu"/>
        <Post name="Yibin Long"/>
        <Button variant="contained" color="primary">
            Hello World
        </Button>
        
    </div>
    */

    <BrowserRouter>
        <div>
            <Route path="/" exact component={Post} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            
        </div>
    </BrowserRouter>

  );
}

export default App;
