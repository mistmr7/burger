let express = require('express')
let bodyParser = require('body-parser')

let PORT = process.env.PORT || 3000

let app = express()

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static('public'))

// Parse application url encoded
app.use(bodyParser.urlencoded({extended: true}))

// Parse application json
app.use(bodyParser.json())

// Set handlebars
let exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

let routes = require('./controllers/burger_controller')

app.use(routes)

app.listen(PORT, ()=> console.log('Server listening on: http://localhost:' + PORT))