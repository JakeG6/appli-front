const passport = require('passport') 
const db = require('./db.js')
require('./server.js')

const keys = require('./keys')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.secretOrKey
}

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

    db.getConnection(function(err, connection) {
        if (err) throw err;
        connection.query(
        `SELECT * FROM users WHERE user_id = ${jwt_payload.id}`,
        function (err, user) {
            if(err) {
                return done(err)
            }
            else{
                if (user) {
                    return done(null, user)
                } 
                else {
                    return done(null, false)
                }
            }
        })
    });

}))

module.exports = passport