import './App.css';
import './Landing_Two.css';
import React, { useState, useCallback } from 'react';
import Card from './Components/Card';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"; // also import Link
import Landing_Two from './Landing_Two';
/*
import { TwitterAuthProvider, signInWithPopup } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; 
import { getAuth } from "firebase/auth"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkjsEr3mWkZbJUZeB8I4aEBg31NCGHUqw",
  authDomain: "testberry-85409.firebaseapp.com",
  projectId: "testberry-85409",
  storageBucket: "testberry-85409.appspot.com",
  messagingSenderId: "354205073568",
  appId: "1:354205073568:web:56fa0beeb68b17964549c5",
  measurementId: "G-0LLDHRG45D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app)
*/
function App() {
  const [username, setUsername] = useState("")
  const [classes, setClasses] = useState(0)
  // to prevent too many API requests 
  // "lock" the retrieved data
  let lock = false
  // since using the React hooks causes many rerenders
  // set to (-1) to make API calls
  const [userData, setUserData] = useState(-1)

  const loadUserData = useCallback(async () => {
    console.log(username)
    if (lock || username === "") {
      return
    }
    await fetch(`http://localhost:3001/id_from_username?username=${username}`)
    .then( res => res.json() )
    .then( async (res_id) => { 
      if (lock || username === "") {
        return
      }
      await fetch(`http://localhost:3001/get_followers?userid=${res_id.data[0].id}`)
      .then( res => res.json() )
      .then( async(res_fer) => {
        if (lock || username === "") {
          return
        }
        await fetch(`http://localhost:3001/get_following?userid=${res_id.data[0].id}`)
        .then( res => res.json() )
        .then( res_fing => {
          if (lock || username === "") {
            return
          }
          var data = {
            userdata: res_id,
            followers: res_fer,
            following: res_fing
          }
          setUserData(data)
          lock = true
        });
      })
    })
    lock = true
  }, [username]);
  
  if (username !==  "" && !lock && userData === -1) {
    // now it executes only ~4 * num_followers requests, instead of infinitely many
    loadUserData()
  }
  console.log("Data", userData)
  console.log("uname", username)
  console.log("classes", classes)

  function getUsernames(list) {
    const unames = list.map( (x) =>
      x.username
    );
    return unames
  }

  function getUsernamesAsListElements(list) {
    const unames = list.map( (x) =>
      <li className="flist">{x.username}</li>
    );
    return unames
  }

  function Homepage() {
    return (
      <div className="App">
        { /*
        <p>Connections</p>
        <ul>
          {getUsernamesAsListElements(userData.followers)}
          {getUsernamesAsListElements(userData.following)}
        </ul>
        <p>Following</p>
        <ul>
          {}
        </ul>
        */}
        <header className="App-header" id="fade-in">
          <p className="web-logo" onClick={event =>  window.location.href='/home'}>berry </p>
          <p className='home-header'>
          <strong>finding classes and mutuals <br/> has never been easier. </strong>
          <br/>
          </p>
          <p className='small-home-header'>
            <strong>Choose your campus</strong>
          </p>
        <Card
        />
          <p className='footer-text'>
          Created for HackIllinois 2022
          <br/> With love, from Aditya Gomatam, Estrella Popoca, and Neel Khare
          </p>
          
        </header>

      </div>
    );
  }
  let app = (
    <div>
      <BrowserRouter>
        <Route exact path={`/users/${username}`} >{username}</Route>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home"></Redirect>
          </Route>
          <Route path="/home" component={Homepage}></Route>
          <Route path="/Landing_Two"><Landing_Two
            username={username} 
            setUsername={setUsername}
            setClasses={setClasses}
            classes={classes}
            userData={userData}
            getUsernames={getUsernamesAsListElements}
          /></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );

  return app
}

export default App;
