'use strict'

const fetch = require('node-fetch')
const cheerio = require('cheerio')

/*
* Function to retrieve raw data
* @param URL: url to course explorer
*/
const getRawData = (URL) => {
    return fetch(URL)
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
    const majorCodeTable = parsedMajorsData("table")[0].children[1].children

    console.log("Subject Code --- Subject")

    majorCodeTable.forEach((row) => {
        // extracting 'td' tags
        if (row.name == 'tr') {
            let subjectCode, subject
            const cols = row.children.filter((col) => col.name === 'td')
            // get subject codes
            const subjectCodeCol = cols[0]
            if (subjectCodeCol) {
                subjectCode = subjectCodeCol.children[0]
                if (subjectCode) {
                    subjectCode = subjectCode.children[0].data
                }
            }

            // get subject name
            const subjectCol = cols[1]
            if (subjectCol) {
                subject = subjectCol.children[0]
                if (subject) {
                    subject = subject.children[0].data
                }
            }

            if (subjectCol && subject) {
                console.log(`${subjectCol} --- ${subject}`)
            }
        }
    })
}

// query url -> https://courses.illinois.edu/schedule/2022/spring/{COURSE CODE}

