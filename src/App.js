import './App.css';
import React, { useState, useCallback } from 'react';
import Card from './Components/Card';


function App() {
  var username = "Szplugz"
  // to prevent too many API requests 
  // "lock" the retrieved data
  let lock = false
  // since using the React hooks causes many rerenders
  const [userData, setUserData] = useState(-1)

  const loadUserData = useCallback(async () => {
    if (lock) {
      return
    }
    await fetch(`http://localhost:3001/id_from_username?username=${username}`)
    .then( res => res.json() )
    .then( async (res_id) => { 
      if (lock) {
        return
      }
      await fetch(`http://localhost:3001/get_followers?userid=${res_id.data[0].id}`)
      .then( res => res.json() )
      .then( async(res_fer) => {
        if (lock) {
          return
        }
        await fetch(`http://localhost:3001/get_following?userid=${res_id.data[0].id}`)
        .then( res => res.json() )
        .then( res_fing => {
          if (lock) {
            return
          }
          var data = {
            userdata: res_id,
            connections: res_fer + res_fing
          }
          setUserData(data)
          lock = true
        });
      })
    })
    lock = true
  }, []);
  
  /*
  const loadUserFollowers = useCallback(async () => {
    if (lock) {
      return
    }
    lock = true
    await fetch(`http://localhost:3001/get_followers?userid=${userData.data[0].id}`)
    .then( res => res.json() )
    .then( res => {
      setFollowers(res)
      lock = false
    });
  }, []);
  
  const loadUserFollows = useCallback(async () => {
    if (lock) {
      return
    }
    lock = true
    await fetch(`http://localhost:3001/get_following?userid=${userData.data[0].id}`)
    .then( res => res.json() )
    .then( res => {
      setFollowing(res)
      lock = false
    });
  }, [setFollowing]);
  */
  if (!lock && userData === -1) {
    // now it executes only ~4 * num_followers requests, instead of infinitely many
    loadUserData()
  }
  console.log("Data", userData)

  return (
    <div className="App">
      <p>
        {userData.connections[0], userData.connections[1]}  
      </p>
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
