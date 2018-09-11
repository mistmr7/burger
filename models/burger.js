// Require the orm created earlier
let orm = require('../config/orm')

// Make a new object that will call the burgers table for the orm created
let burger = {
    all: ((cb) => {
        orm.all('burgers', function(res) {
            cb(res)
        })
    }),
    create: (function(cols, vals, cb) {
        orm.create('burgers', cols, vals, (res) => {
            cb(res)
        })
    }),
    update: (function(objColVals, condition, cb) {
        orm.update('burgers', objColVals, condition, (res) => {
            cb(res)
        })
    }),
    delete: ((condition, cb) => {
        orm.delete('burgers', condition, (res) => {
            cb(res)
        })
    })

}

// Export the object
module.exports = burger