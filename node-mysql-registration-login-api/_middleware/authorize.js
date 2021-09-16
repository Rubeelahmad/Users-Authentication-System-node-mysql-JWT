const jwt = require('express-jwt');
const njwt = require('jsonwebtoken');
const { secret } = require('config.json');
const db = require('_helpers/db');
const config = require('../config.json');

async function authorize(req, res, next) {
    
   // console.log(req.body)

    try {
        const auth = req.headers.authorization;
        console.log(auth)
        if (!auth) {
         
          var message = 'Auth Token does not match, Authorization failed.';
          return res.status(404).send(message);
        }
        // const token = await req.headers.authorization.split(' ')[1];
        const token = await auth.split(' ')[1];
        const decodedToken = await njwt.verify(token, config.secret);
        const userId = decodedToken.sub;
       // console.log(decodedToken)
        if (!userId) {
            var message = 'User id not found, Authorization failed.';
            return res.status(404).send(message);
        } else {
           req.body.user_id = userId
           console.log("Body ID: " + req.body.user_id)
           return next();

        }
      } catch (err) {
          console.log(err)
        var message = 'User Not Authorized...!!!';
        return res.status(404).send(message);
      }
    
    // return [
    //     // authenticate JWT token and attach decoded token to request as req.user
    //     jwt({ secret, algorithms: ['HS256'] }),
        
    //     // attach full user record to request object
    //     async (req, res, next) => {
    //         // get user with id from token 'sub' (subject) property
    //         const user = await db.User.findByPk(req.user.sub);
    //         console.log(user)
    //         // check user still exists
    //         if (!user)
    //             return res.status(401).json({ message: 'Unauthorized' });

    //         // authorization successful
    //         req.user = user.get();
    //         next();
    //         console.log('jsdhfusdfudsfiudsfiudsiudsfiudsf')
    //     }
    // ];
    console.log("outside of authorized")
}

module.exports = authorize;