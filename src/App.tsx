import React from 'react';
import { Home } from './pages/Home';
import firebase from "./services/firebase";


function App() {
  console.log(firebase)
  return (
   <Home/>
  );
}

export default App;
