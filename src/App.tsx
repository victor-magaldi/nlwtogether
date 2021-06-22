import React from 'react';

import { BrowserRouter, Route}from "react-router-dom"

import firebase from "./services/firebase";

import { Home } from './pages/Home';
import NewRoom from './pages/NewRoom';

import "./styles/global.scss"


function App() {
  console.log(firebase)
  return (

    <BrowserRouter>
      <Route path="/" exact component={Home}></Route>
      <Route path="/rooms/new" component={NewRoom}></Route>
    
    </BrowserRouter>

  );
}

export default App;
