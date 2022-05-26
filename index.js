const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('./auth');

const app = express();
const home="https://oauth-login-mern.netlify.app/home";
const port=process.env.port;

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'babi', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

// GOOGLE
app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: home,
    failureRedirect: '/auth/google/failure'
  })
);

// FACEBOOK
app.get("/auth/facebook", passport.authenticate("facebook",{ scope: ["profile"] }));
app.get("/auth/facebook/callback",
    passport.authenticate( 'facebook', {
      successRedirect:  home,
      failureRedirect: '/auth/facebook/failure'
    })
    );


//GITHUB
app.get("/auth/github", passport.authenticate("github",{ scope: ["profile"] }));
app.get("/auth/github/callback",
    passport.authenticate( 'github', {
      successRedirect:  home,
      failureRedirect: '/auth/github/failure'
    })
    );

app.get('/protected', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

// google
app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

// github
app.get('/auth/github/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

app.listen(port, () => console.log('sever is running'));