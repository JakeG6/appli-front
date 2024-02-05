const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const keys = require('../keys')

require('../passportStuff');

const db = require('../db.js')

//app.use(cors())

// parse application/x-www-form-urlencoded
// router.use(bodyParser.json()); // support json encoded bodies
// router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//attempt to login
router.post('/', function(req, res) {
  
    const username = req.body.username;
    const password = req.body.password;
    
    db.getConnection(function(err, connection) {
      connection.release();
  
      if (err) throw err;
      
      if (username.length < 1) {
        //res.setHeader('Access-Control-Allow-Origin', 'https://appli-api.herokuapp.com/login');

        return res.status(404).send("password wasn't included")

      }
    
      connection.query(`SELECT * FROM users WHERE username = "${username}"`, function (err, user) {
        if(err || !user) {
          return res.status(404).json({username: 'User not found'});
        }
        bcrypt.compare(password, user[0].password, (err, result) => {       
          if (result) {
  
            // Create JWT Payload
            const payload = { id: user[0].user_id, name: user[0].username, color: user[0].color } 
  
            // Sign and send out the token
            jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
              //res.setHeader('Access-Control-Allow-Origin', 'https://appli-api.herokuapp.com/');

              res.json({success: true, token:  token,})
            
            });
          }
          else { 
            return res.status(404).json({username: `password doesn't match`})
          }
        })
      })
    });
});

module.exports = router;