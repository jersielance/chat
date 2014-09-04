/**
 * Created by jersie on 04.09.14.
 */
var nconf = require('nconf');
var path = require('path');

nconf.argv()
    .env()
    .file({ file: path.join(__dirname, 'config.json')});

module.exports = nconf;