let connection = require('../config/connection')

function printQuestionMarks(num) {
    let arr = []
    
    for (i = 0; i < num; i++) {
        arr.push('?')
    }
    return arr.toString()
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    let arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      let value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }

  // Define the orm
let orm = {
    // SELECT all query
    all: function (tableInput, cb) {
        let queryString = 'SELECT * FROM ' + tableInput + ';'
        console.log(queryString)
        connection.query(queryString, (err, result) => {
            if (err) {
                throw new Error('Error occurred calling ALL orm', err)
            } else {
                cb(result)
            }
        })
    },
    // Add values to a table 
    create: function(table, cols, vals, cb) {
        let queryString = "INSERT INTO " + table;
    
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
    
        console.log(queryString);
    
        connection.query(queryString, vals, function(err, result) {
          if (err) {
            throw new Error('Error occurred calling CREATE orm', err);
          }
          cb(result);
        });
      },
      // Update a table
      update: function(table, objColVals, condition, cb) {
        let queryString = "UPDATE " + table;
    
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
    
        console.log(queryString);
        connection.query(queryString, function(err, result) {
          if (err) {
            throw new Error('Error occurred calling UPDATE orm', err);
          }
    
          cb(result);
        });
      },
      // Delete values from a table
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