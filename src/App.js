import './App.css';
import React, { useState } from 'react';
import Card from './Components/Card';

async function loadUserId(username, setUserData) {
  await fetch(`http://localhost:3001/id_from_username?username=${username}`)
  .then( res => res.json() )
  .then( res => setUserData(res))
}

async function loadUserFollowers(userId, setFollowers) {
  await fetch(`http://localhost:3001/get_followers?userid=${userId}`)
  .then( res => res.json() )
  .then( res => setFollowers(res) )
}

async function loadUserFollows(userId, setFollowing) {
  await fetch(`http://localhost:3001/get_following?userid=${userId}`)
  .then( res => res.json() )
  .then( res => setFollowing(res) )
}

function App() {
  var username = "Szplugz"
  // to prevent too many API requests
  const [lock, setLock] = useState(false)
  const [userData, setUserData] = useState(0)
  const [userFollowers, setFollowers] = useState(-1)
  const [userFollowing, setFollowing] = useState(-1)
  if (userData === 0 && !lock) {
    lock = true
    loadUserId(username, setUserData)
  }
  if (userData !== 0 && userFollowers === -1) {
    loadUserFollowers(userData.data[0].id, setFollowers)
  }
  if (userData !== 0 && userFollowers === -1) {
    loadUserFollows(userData.data[0].id, setFollowing)
  }
  console.log(userData)
  console.log(userFollowers)
  console.log(userFollowing)
  return (
    <div className="App">
      
      <header className="App-header" id="fade-in">
        <p className="web-logo" >berry </p>
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


export default App;
