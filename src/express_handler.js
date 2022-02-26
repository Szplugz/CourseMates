const express = require('express')

const PORT = process.env.PORT || 3001;  // Our port defaults to port 3001 (if no port is provided)

const app = express();

// following links client to server, sourced from:
// https://stackoverflow.com/questions/58450951/blocked-by-cors-policy-error-when-calling-to-mongo-golang-db-with-angular-web-ap
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.listen(PORT, () => 
    {
        console.log(`Server listening on ${PORT}`);     // Note the use of the ` quote instead of ' or " -- ` encloses a formatted string
    });