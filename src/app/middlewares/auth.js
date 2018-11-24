module.exports = (req, res, next) => {  
  if(req.session && req.session.user){
    //nao importa a view, o user sempre será o mesmo
    res.locals.user = req.session.user;

    return next();
  }

  return res.redirect('/');
}