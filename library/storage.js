const knexLib = require('knex')
const dbCfg = require('../knexfile')
const { uuid } = require('./utils')

let conn = null

function connect () {
    return new Promise(function (resolve, reject) {
       conn = knexLib(dbCfg.development)
        conn.raw(`SELECT 1 + 1 AS test`)
        .then((result) => {
            console.log(result.rows)
            if (result.rows.length === 1 && result.rows[0].test === 2) {
                console.log("Database connection established 👍")
                resolve()
            } else {
                reject('Database was unable to do 1 + 1 👎')
            }
            console.log(xxxxxxxxxxx)

        })
        .catch((err) => {
            reject(err)
        })      
    })
}

//Grab All Threads SQL Query
const getNotesQuery = `select * from notes`

//Returns all threads from promise
function getNotes () {
    return conn.raw(getNotesQuery)
    .then((result) => {
        return result
    }) 
    .catch((err) => {
        console.log(err)
    })
}

const createNameQuery = `insert into notes (uuid, message, date, time, destination, phonenumber, ctime, mtime)
values (?, ?, ?, ?, ?, ?, current_timestamp, current_timestamp)`

//addMessage, addDate, addTime, addPlace, addPhone
//message, date, time, where, toPerson
function addEntry (addMessage, addDate, addTime, addPlace, addPhone) {
    return conn.raw(createNameQuery, [uuid(), addMessage, addDate, addTime, addPlace, addPhone])
        .then((result) => {
            return result.rows[0]
        }).catch((err) => {
            console.log(err)
        })
}

module.exports = {
    connect: connect,
    getNotes: getNotes,
    addEntry: addEntry,
}