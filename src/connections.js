const Instagram = require('instagram-web-api')
const express = require('express')

// poorly named file
const PORT = process.env.PORT || 3001;  // Our port defaults to port 3001 (if no port is provided)

const app = express();

let client
let profile = {}
let userId

async function login(username, password, first_ = 10) {
    /// @TODO: Make sure profile also contains a list : str of classes
    /// Should we make classes because we have global variables?
    client = new Instagram({ username, password })
    try {
        profile = await client.login()
    } catch (error) {
        console.log(error)
    }
    userId = profile.userId
}


async function getConnections(username, password, first_ = 10) {
    // get first 100 followers and followings, can disable the first thing
    /// Elements in arrays of type {typeof(followers)} contain the following fields: 
    /// id, username, full_name (bio name)
    var followers = [] /// @TODO: Add type {typeof(followers)}
    var following = []
    
    try {
        followers = await client.getFollowers({  userId: userId_, first: first_ })
        /// @TODO: REMOVE LATER
        /// I want to set return types everywhere for ease of reference because I can't test
        console.log(typeof(followers))                                              
    } catch(e) {
        console.log(e)
    }

    try {
        following = await client.getFollowings({ userId: userId_, first: first_ })
    } catch (e) {
        console.log(e)
    }
    
    // connections is the union of those 2 arrays
    // each object in data has the following fields: id, username, full_name (bio name), 
    var connections = followers.data + following.data
    
    /// @TODO: Before returning connections, add a field `classes`, which is a list : str of 
    /// all the classes each user (element in connections) is taking

    // should we do this here?
    client.logout()
    
    return connections
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
