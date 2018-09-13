var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
// 해쉬 알고리즘 적용 횟수;
var SALT_FACTOR = 10;

var userScheme = mongoose.Schema({
  username:  {type: String, required: true, unique: true},
  password: {type: String, required: true},
  createAt: {type: Date, default: Date.now},
});

userScheme.methods.name = function() {
  return this.username;
};
// bcrypt를 위한 빈 함수
var noop = function(){};

userScheme.pre("save", function(done) {
  var user = this;
  if (!user.isModified("password")) {
    return done();
  }
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) { return done(err);}
    bcrypt.hash(user.password, salt, noop, function(err, hashedpassword) {
      if (err){return done(err);}
      user.password = hashedpassword;
      done();
    })
  })
})

userScheme.methods.checkPassword = function(guess, done) {
  bcrypt.compare(guess, this.password, function(err, isMatch) {
    done(err, isMatch);
  })
}

var User = mongoose.model("User", userScheme);
module.exports = User;