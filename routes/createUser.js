const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
require('../passportStuff');

const db = require('../db.js')

//router.use(cors())

// parse application/x-www-form-urlencoded
// router.use(bodyParser.json()); // support json encoded bodies
// router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

router.post('/', (req, res) => {
    let username = req.body.username
    let password = req.body.password
  
    bcrypt.hash(password, 10, function(err, hash) {
      // Store hash in your password DB.
      db.getConnection(function(err, connection) {
        //connection.release();
  
        if (err) throw err
        connection.query(`INSERT INTO users (username, password) VALUES ("${username}", "${hash}")`,
          function (err, dbResponse) {
            connection.release();
            if (err) {
              console.log("error: ", err)
            }
            else {
              res.send(dbResponse)
            }
          })
      })
    });
})

module.exports = router;