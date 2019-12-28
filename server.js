const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const bodyParser = require('body-parser')
const passport = require('passport')
const cors = require('cors')

const db = require('./db.js')
require('./passportStuff')


app.use(favicon(__dirname + '/build/favicon.ico'));

// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

//API routes
const login = require('./routes/login.js')
const updatePassword = require('./routes/updatePassword.js')
const createUser = require('./routes/createUser.js')
const createTicket = require('./routes/createTicket.js')
const updateTicket = require('./routes/updateTicket.js')
const checkUniqueName = require('./routes/checkUniqueName.js')
const retrieveTickets = require('./routes/retrieveTickets.js')
const retrieveTicketById = require('./routes/retrieveTicketById.js')
const deleteTicket = require('./routes/deleteTicket.js')

app.use(cors())
app.use(require('./headers'))
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//parse application/x-www-form-urlencoded

app.get('/auth/check', (req, res) => {
  if (!req.user) {

    return res.sendStatus(401)
  } else {

    return res.status(200).send(req.user)
  }
});

//Hello world
app.get('/api/hello', function (req, res) {
  console.log("hello, ", req.user)

  res.send('the Appli API is functioning. I am glad to see you.')
})

//Check if new username is unique
app.use('/api/checkuniquename', checkUniqueName)

//Attempt to log in
app.use('/api/login', login);

//Check if user is authorized
app.get('/api/isauthorized', passport.authenticate('jwt', { session: false }), (req, res) => {

  res.json(req.user)
})

//Check current user
app.get('/api/currentuser', passport.authenticate('jwt', { session: false }), (req, res) => {

  res.json(req.user)
})

//Attempt to log out
app.get('/api/logout', function(req, res){

  req.logout();
  res.redirect('/');
});

//Create a new user
app.use('/api/createuser', createUser);

//Create a new job application ticket
app.use('/api/createticket', createTicket);

//Retrieve tickets from DB by user_id
app.use('/api/retrievetickets', retrieveTickets)

//Retrieve one ticket by ticket_id
app.use('/api/retrieveticketbyid', retrieveTicketById)

//Update Ticket in DB
app.use('/api/updateticket', updateTicket);

//Delete Ticket in DB
app.use('/api/deleteticket', deleteTicket)

//Update the Password
app.use('/api/updatepassword', updatePassword);

//Gracefully shut down
process.on( 'SIGINT', () => {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );

  db.end(function(err) {

  })
  process.exit( );
})

//send front-end client
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => console.log(`Appli api is listening on port ${port}!`))