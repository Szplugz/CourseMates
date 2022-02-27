const needle = require("needle")
require("dotenv/config"); 

// this is the ID for @TwitterDev
const bearerToken = process.env.BEARER_TOKEN;

const express = require('express')

const PORT = process.env.PORT || 3001;  // Our port defaults to port 3001 (if no port is provided)

const app = express();

const MAX_RESULTS_PER_PAGE = 500

// https://github.com/twitterdev/Twitter-API-v2-sample-code/blob/main/User-Lookup/get_users_with_bearer_token.js
const endpointURL = "https://api.twitter.com/2/users/by?usernames="

async function getIdDataFromUsername(username) {

    // These are the parameters for the API request
    // specify User names to fetch, and any additional fields that are required
    // by default, only the User ID, name and user name are returned
    const params = {
        usernames: username, // Edit usernames to look up
        "user.fields": "id", // Edit optional query parameters here
    }

    // this is the HTTP header that adds bearer token authentication
    const res = await needle('get', endpointURL, params, {
        headers: {
            "User-Agent": "v2UserLookupJS",
            "authorization": `Bearer ${bearerToken}`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request')
    }
}

// https://github.com/twitterdev/Twitter-API-v2-sample-code/blob/main/Follows-Lookup/followers_lookup.js
async function getFollowers(userid) {
    let users = [];
    let params = {
        "max_results": MAX_RESULTS_PER_PAGE,
        "user.fields": "created_at",
    }

    const options = {
        headers: {
            "User-Agent": "v2FollowersJS",
            "authorization": `Bearer ${bearerToken}`
        }
    }

    let hasNextPage = true;
    let nextToken = null;
    console.log("Retrieving followers...");
    while (hasNextPage) {
        let resp = await getPage(params, options, nextToken, userid);
        if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
            if (resp.data) {
                users.push.apply(users, resp.data);
            }
            if (resp.meta.next_token) {
                nextToken = resp.meta.next_token;
            } else {
                hasNextPage = false;
            }
        } else {
            hasNextPage = false;
        }
    }

    return users
}

async function getFollowing(userid) {
    let users = [];
    let params = {
        "max_results": MAX_RESULTS_PER_PAGE,
        "user.fields": "created_at",
    }

    const options = {
        headers: {
            "User-Agent": "v2FollowingJS",
            "Authorization": `Bearer ${bearerToken}`
        }
    }

    let hasNextPage = true;
    let nextToken = null;
    console.log("Retrieving users this user is following...");
    while (hasNextPage) {
        let resp = await getPage(params, options, nextToken, userid);
        if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
            if (resp.data) {
                users.push.apply(users, resp.data);
            }
            if (resp.meta.next_token) {
                nextToken = resp.meta.next_token;
            } else {
                hasNextPage = false;
            }
        } else {
            hasNextPage = false;
        }
    }
    return users
}

const getPage = async (params, options, nextToken, userid) => {
    const url = `https://api.twitter.com/2/users/${userid}/followers`;
    if (nextToken) {
        params.pagination_token = nextToken;
    }

    try {
        const resp = await needle('get', url, params, options);

        if (resp.statusCode != 200) {
            console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
            return;
        }
        return resp.body;
    } catch (err) {
        throw new Error(`Request failed: ${err}`);
    }
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

app.get("/id_from_username", async (req, res) => {
    var id = await getIdDataFromUsername(req.query.username)
    res.send(id)
});

app.get("/get_followers", async (req, res) => {
    var concs = await getFollowers(req.query.userid)
    console.log("number of results:", concs.length)
    res.send(concs)
});

app.get("/get_following", async (req, res) => {
    var concs = await getFollowing(req.query.userid)
    console.log("number of results", concs.length)
    res.send(concs)
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`); 
});
