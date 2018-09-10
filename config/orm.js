let connection = require('../config/connection.js')

function printQuestionMarks(num) {
    let arr = []
    
    for (i = 0; i < num; i++) {
        arr.push('?')
    }
    return arr.toString()
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    let arr = []
    // loop through the keys and push the key/value as a string into arr
    for (var key in ob) {
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations 
            if (typeof value === 'string' && value.indexOf(' ') >= 0) {
                value = "'" + value + "'"
            }
            arr.push(key + "'" + '=' + "'")
        }
    }
    return arr.toString()
}

let orm = {
    all: function (tableInput, cb) {
        let queryString = 'SELECT * FROM' + tableInput + ';'
        connection.query(queryString, (err, result) => {
            if (err) {
                throw new Error('Error occurred calling ALL orm', err)
            } else {
                cb(result)
            }
        })
    }, 
    create: function(table, cols, vals, cb) {
        let queryString = 'INSERT INTO ' + table;
        queryString += ' (' + cols.toString + ') '
        queryString += 'VALUES (' + printQuestionMarsk(vals.length) + ');'
        
        console.log(queryString)

        connection.query(queryString, vals, (err, result) => {
            if (err) {
                throw new Error('Error occurred calling CREATE orm', err)
            } else {
                cb(result)
            }
        })
    },
    update: function(table, objColVals, condition, cb) {
        let queryString = 'UPDATE ' + table
        queryString += ' SET ' + objToSql(objColVals)
        queryString += ' WHERE ' + condition + ';'

        console.log(queryString)

        connection.query(queryString, (err, result) => {
            if (err) {
                throw new Error('Error occurred calling UPDATE orm', err)
            } else {
                cb(result)
            }
        })
    },
    delete: (table, condition, cb) => {
        let queryString = 'DELETE FROM ' + table
        queryString += ' WHERE ' + condition + ';'
        
        console.log(queryString)

        connection.query(queryString, (err, result) => {
            if (err) {
                throw new Error('Error occurred calling DELETE orm', err)
            } else {
                cb(result)
            }
        })
    }    
}

module.exports = orm