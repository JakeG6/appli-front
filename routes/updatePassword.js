const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../passportStuff');

const db = require('../db.js');

router.put('/', passport.authenticate('jwt', { session: false }), (req, res) => {

  let username = req.body.username,
    oldPassword = req.body.oldPassword,
    newPassword = req.body.newPassword

  db.getConnection(function(err, connection) {
    connection.release();
    if (err) throw err
    
    connection.query(`SELECT * FROM users WHERE username = "${username}"`, function (err, user) {
            
      if(err || !user) {
        return res.status(404).json({username: 'User not found'})
      }
      
      if (oldPassword === user[0].password) {
        //Passwords match. it will be replaced with the new password.
        db.getConnection(function(err, connection) {
          //connection.release();
    
          if (err) throw err
          connection.query(`UPDATE users SET password = "${newPassword}" WHERE username = "${username}"`,
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
      }
      else { 
        return res.status(404).json({username: `password doesn't match`})
      }
      
    })
  })
})

module.exports = router;