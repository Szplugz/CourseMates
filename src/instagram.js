const Instagram = require('instagram-web-api')

var headers = new Headers()
headers.append("Access-Control-Allow-Origin", "*")
headers.append("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE")
headers.append("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")

async function getConnections(username, password, first_ = 1) {
    const client = new Instagram({ username, password })
    const profile = await client.login()
    const userId_ = profile.userId
    // get first 100 followers and followings, can disable the first thing
    var followers = []
    var following = []
    try {
        followers = await client.getFollowers({  userId: userId_, first: first_ })
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
    
    // should we do this here?
    client.logout()

    return connections
}

export default getConnections;
