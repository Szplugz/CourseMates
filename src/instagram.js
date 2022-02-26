const Instagram = require('instagram-web-api')
const express = require('express')

// poorly named file
const PORT = process.env.PORT || 3001;  // Our port defaults to port 3001 (if no port is provided)

const app = express();

async function getConnections(username, password, first_ = 10) {
    const client = new Instagram({ username, password })
    var profile = {}
    try {
        profile = await client.login()
    } catch (error) {
        console.log(error)
    }
    const userId_ = profile.userId
    
    // get first 100 followers and followings, can disable the first thing
    var followers = []
    var following = []
    
    try {
        followers = await client.getFollowers({  userId: userId_, first: first_ })
    } catch(e) {
        console.log(e)
    }
    /*
    try {
        following = await client.getFollowings({ userId: userId_, first: first_ })
    } catch (e) {
        console.log(e)
    }
    
    // connections is the union of those 2 arrays
    // each object in data has the following fields: id, username, full_name (bio name), 
    var connections = followers.data + following.data
    
    // should we do this here?
    */
    client.logout()
    
    return { "uid": userId_, "fols": followers, "fing": following }
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

app.get("/test", (req, res) => { res.send("hello") });

app.get("/get_connections", async (req, res) => {
    var concs = await getConnections("spectraldoy", "")
    res.send(concs)
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`); 
});
