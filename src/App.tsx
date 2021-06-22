import React from 'react';
import { Home } from './pages/Home';
import firebase from "./services/firebase";

import "./styles/global.scss"


function App() {
  console.log(firebase)
  return (
   <Home/>
  );
}

export default App;
