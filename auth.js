const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

const GOOGLE_CLIENT_ID ="232564337700-d94iadg34jp3eeph6fggae2pukp12pb2.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const FACEBOOK_APP_ID ="330234009185284";
const FACEBOOK_APP_SECRET ="67c887c4a85f85ad3e17abdbdcefe114";

const GITHUB_CLIENT_ID = "8e328d5d670388611868"
const GITHUB_CLIENT_SECRET = "c77f49d44f3d01f1cb356203ed16070333b74681"

//Google
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "https://oauth-login-backend.herokuapp.com/auth/google/callback",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

// Facebook
passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "https://oauth-login-backend.herokuapp.com/auth/facebook/callback",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

//Github
passport.use(new GithubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "https://oauth-login-backend.herokuapp.com/auth/github/callback",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});