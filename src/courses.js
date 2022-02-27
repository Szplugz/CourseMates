'use strict'

const fetch = require('node-fetch')
const cheerio = require('cheerio')

/*
* Function to retrieve raw data
* @param URL: url to course explorer
*/
const getRawData = async (URL) => {
    return await fetch(URL)
        .then((response) => response.text())
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
        })
        .then((data) => {
            return data
        })
}

/// This url needs to be selected based on the college - right now it's hard-coded
const baseURL = "https://courses.illinois.edu/schedule/DEFAULT/DEFAULT"

/// Load main table
/// Add functionality later to get information for each major

const getMainTable = async () => {
    const rawMajorsData = await getRawData(baseURL)
    const parsedMajorsData = cheerio.load(rawMajorsData)
    /// Not entirely sure what the last .children is for
    /// I think parsedMajorsData("table")[0] is the whole table
    /// and .children[1] gets rid of the column headings
    const majorCodeTable = parsedMajorsData("td")

    console.log("Subject Code --- Subject")
    //console.log(majorCodeTable)

    console.log(majorCodeTable.length)
    for (let i = 0; i < 382; i++) {
        let row = majorCodeTable[i]
        let t = row.children[0].data
        // here we have restriction that char

        console.log(t.replace(/[^a-zA-Z0-9]/, ''))
    }
    
}

// query url -> https://courses.illinois.edu/schedule/2022/spring/{COURSE CODE}
getMainTable();
