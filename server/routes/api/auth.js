

const User = require('../../models/User');
var passport = require("passport");

module.exports = (app) => {
  app.get("/", (req, res, next) => {
    User.find().sort({createAt: "descending"})
      .exec(function(err, users) {
        if (err){
          return next(err);
        };
        res.redirect("/login");
      })
  })

  app.get("/myinfo", (req, res, next) => {
    User.findOne({username: req.user.username})
      .exec()
      .then((user) =>
      {
        res.status(200).send({
          username: user.username
        })
      })
      .catch((err) => next(err));
  })

  app.post('/api/auth/signup', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({username: username}, function(err, user) {
      if (err) { return next(err);}
      if (user) {
        req.flash("error", "사용자가 이미 있습니다.");
        return res.redirect("/signup");
      }
      const newUser = new User({
        username: username,
        password: password
      });
      newUser.save(next);
    });
  }, passport.authenticate("login", {
    successRedirect: "/editor",
    failureRedirect:"/signup",
    failureFlash: true
  }));

  app.post('/api/auth/login', passport.authenticate("login",  {
    successRedirect: "/editor",
    failureRedirect: "/login",
    failureFlash: true
  }));

  app.get("/api/auth/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
};
