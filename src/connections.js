'use strict'

const Instagram = require('instagram-web-api')
const express = require('express')

// poorly named file
const PORT = process.env.PORT || 3001;  // Our port defaults to port 3001 (if no port is provided)

const app = express();

let client
let profile = {}
let userId

async function login(username, password, first_ = 10) {
    /// @TODO: Make sure profile also contains an array : str of classes
    /// Should we make classes because we have global variables?
    client = new Instagram({ username, password })
    try {
        profile = await client.login()
    } catch (error) {
        console.log(error)
    }
    userId = profile.userId
}


async function getConnections(currentUserId) {
    // get first 100 followers and followings, can disable the first thing
    /// Elements in arrays of type {typeof(followers)} contain the following fields: 
    /// id, username, full_name (bio name)
    var followers = [] /// @TODO: Add type {typeof(followers)}
    var following = []
    
    try {
        followers = await client.getFollowers({  currentUserId: userId_ })
        /// @TODO: REMOVE LATER
        /// I want to set return types everywhere for ease of reference because I can't test
        console.log(typeof(followers))                                              
    } catch(e) {
        console.log(e)
    }

    try {
        following = await client.getFollowings({ currentUserId: userId_ })
    } catch (e) {
        console.log(e)
    }
    
    // connections is the union of those 2 arrays
    // each object in data has the following fields: id, username, full_name (bio name), 
    var connections = followers.data + following.data
    
    /// @TODO: Before returning connections, add a field `classes`, which is an array : str of 
    /// all the classes each user (element in connections) is taking

    // should we do this here?
    client.logout()
    
    return connections
}

async function findAllCommons(currentUserId) {
    const connections = getConnections(currentUserId)
    let data = {}
    /// Assuming 'connection' is a user object, which it is currently not
    for (const connection of connections) {
        let listOfCommonClasses = getCommonClasses(connection)
        data.put(connection, listOfCommonClasses)
    }
    return data
}

/// Need to find a way to construct users. Not sure exactly what the structure is right now.
async function getCommonClasses(otherUser) {
    let otherUserClasses = otherUser.profile.classes
    let currentUserClasses = profile.classes
    /// The following finds classes in common between the two arrays
    /// Uses Array.prototype.filter() and Array.prototype.includes()
    const commonClasses = otherUserClasses.filter(class_ => currentUserClasses.includes(class_))
    return commonClasses
}

// following bypasses CORS, sourced from:
// https://stackoverflow.com/questions/58450951/blocked-by-cors-policy-error-when-calling-to-mongo-golang-db-with-angular-web-ap
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(express.json()); 

/// @TODO: What
app.get("/test", (req, res) => { res.send("hello") });


/// @TODO: Set up getConnections params to be read directly from POST request
app.get("/get_connections", async (req, res) => {
    var concs = await getConnections("", "")
    res.send(concs)
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`); 
});
