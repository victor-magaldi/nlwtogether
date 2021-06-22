import React from 'react';
// import { Home } from './pages/Home';
import NewRoom from './pages/NewRoom';
import firebase from "./services/firebase";

import "./styles/global.scss"


function App() {
  console.log(firebase)
  return (
   <NewRoom/>
  );
}

export default App;
