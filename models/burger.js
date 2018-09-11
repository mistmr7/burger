let orm = require('../config/orm')

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


module.exports = burger