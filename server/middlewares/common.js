function checkUser(req, res, next) {
  if (req.session.login) {
    next();
  } else {
    res.redirect("/login");
  }
}

function checkAdmin(req, res, next) {
  if (req.session.isAdmin === true) {
    next();
  } else {
    res.redirect("/");
  }
}

function secureRoute(req, res, next) {
  if (!req.session.login) {
    next();
  } else {
    res.redirect("/");
  }
}

module.exports = { checkUser, secureRoute, checkAdmin };
