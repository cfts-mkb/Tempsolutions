var {User} = require('./../models/User.js');

var authenticate = (req,res,next) => {

  if(req.session && req.session.auth && req.session.auth.sessionId){

    var token = req.session.auth.sessionId;

      User.findByToken(token).then((user) => {

        if(!user){

          return Promise.reject();

        }

        req.user = user;
        req.token = token;
        next();

      }).catch((err) => {

        res.status(401).render('errorFile',{errorMessage:"Authentication failure. Login to access this feature."});

      });

  }else{

    res.status(401).render('errorFile',{errorMessage:"Authentication failure. Login to access this feature."});

  }

};

module.exports = {authenticate};
