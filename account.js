var express = require('express'),
    passport = require('passport'),
    //TwitterStrategy = require('passport-twitter').Strategy,
    ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
    app = express();

app.get('/account',
  ensureLoggedIn('/login'),
  function(req, res) {
    res.send('<html><body>Ola '+ req.user.username+'.<br/><a href="/logout">Logout</a></body></html> ');
});

app.get('/login',
  function(req, res) {
    res.send('<html><body><a href="/auth/twitter">Login com Twitter</a></body></html>');
  });

app.listen(3000);