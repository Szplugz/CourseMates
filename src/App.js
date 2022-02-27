import './App.css';
import React, { useState, useCallback } from 'react';
import Card from './Components/Card';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"; // also import Link
import Landing_Two from './Landing_Two';

function App() {
  var username = "8uzz0ff"
  // to prevent too many API requests 
  // "lock" the retrieved data
  let lock = false
  // since using the React hooks causes many rerenders
  // set to (-1) to make API calls
  const [userData, setUserData] = useState(
  {
    userdata: {
      data: [{id: '1285878664500883456', name: 'Neel', username: 'Szplugz'}]
    },
    followers: [
      {id: '2536623739', created_at: '2014-05-31T04:47:03.000Z', username: 'fidelgeorge1', name: 'Fidel George'},
      {id: '1395030869308547077', created_at: '2021-05-19T14:57:53.000Z', username: 'TycoonCRM', name: 'TYCOON CRM'},
      {id: '1445714705884979201', name: "nature'swrath96", created_at: '2021-10-06T11:37:13.000Z', username: 'devaslutty'},
      {id: '870261369068593152', name: 'Mahos Rakta', created_at: '2017-06-01T12:50:53.000Z', username: 'rumplespaceking'},
      {id: '1413196247343665155', name: 'Wynaut Rhydon The The', created_at: '2021-07-08T18:00:52.000Z', username: 'RhydonWynaut'}
    ],
    following: [
      {id: '1395030869308547077', created_at: '2021-05-19T14:57:53.000Z', username: 'TycoonCRM', name: 'TYCOON CRM'},
      {name: 'Torino YenTa', username: 'TorinoYenta', id: '1479321403627245568', created_at: '2022-01-07T05:18:26.000Z'},
      {name: 'rambunctious scallywag', username: 'amemefriend', id: '1373303349597007876', created_at: '2021-03-20T16:00:25.000Z'},
      {name: 'official funny man', username: 'gerbswastaken', id: '1179650436590006272', created_at: '2019-10-03T06:53:15.000Z'}
    ]
  })

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
            followers: res_fer,
            following: res_fing
          }
          setUserData(data)
          lock = true
        });
      })
    })
    lock = true
  }, []);
  
  if (!lock && userData === -1) {
    // now it executes only ~4 * num_followers requests, instead of infinitely many
    loadUserData()
  }
  console.log("Data", userData)
  if (userData !== -1) {
    // save it somehow
  }

  function getUsernames(list) {
    const unames = list.map( (x) =>
      x.username
    );
    return unames
  }

  function getUsernamesAsListElements(list) {
    const unames = list.map( (x) =>
      <li>{x.username}</li>
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
        <Switch>
          <Route exact path="/">
            <Redirect to="/home"></Redirect>
          </Route>
          <Route path="/home" component={Homepage}></Route>
          <Route path="/Landing_Two" component={Landing_Two}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );

  return app
}

export default App;
