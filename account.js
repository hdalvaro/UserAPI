var express = require('express'),
    passport = require('passport'),
    ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn,
    app = express();

app.get('/account',
  ensureLoggedIn('/login'),
  function(req, res) {
    res.send('<html><body>Ola '+ req.user.username+'.<br/><a href="/logout">Logout</a></body></html> ');
});

app.listen(3000);
