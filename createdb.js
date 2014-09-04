var User = require('models/user').User;

var user = new User({
    username: "tfester",
    password: "secret"
});

user.save(function (err, user, affected) {
    if (err) throw err;

    User.findOne({username: "tfester"}, function(err, tester) {
        console.log(tester)
    })
});