const Instagram = require('instagram-web-api')
const uname = "spectraldoy"
const pword = ""

async function gf(username, password) {
    // assume username and password have been retrieved from a textbox
    const client = new Instagram({ username, password })
    await client.login()
    const profile = await client.getProfile()
    console.log(profile)
    await client.logout()
}

export default gf;

 
