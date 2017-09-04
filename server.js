const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const Mongo = require('mongodb');

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'dist')
            }
        }
    }
});

server.connection({ port: process.env.PORT || 3000 });

global.iron = require('iron');
global.Mongo = Mongo;
global.MongoClient = Mongo.MongoClient
global.url = "mongodb://toto:toto@ds011462.mlab.com:11462/clementvh";

server.state('access_token', {
    ttl: 1000*60*60*24*365,
    isSecure: false,
    isHttpOnly: false,
    encoding: 'iron',
    clearInvalid: false,
    strictHeader: false,
    password: "passwordpasswordpasswordpassword"
});

server.register(Inert, () => {});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true
        }
    }
});

const Auth = new (require('./app/auth/Auth.js'))();
server.route(Auth.login);
server.route(Auth.register);

const Home = new (require('./app/home/Home.js'))();
server.route(Home.myBarelz);

const User = new (require('./app/common/User.js'))();
server.route(User.userInfos);
server.route(User.removeBarel);

const Library = new (require('./app/library/Library.js'))();
server.route(Library.catalog);
server.route(Library.addBarel);

server.start((err) => {

    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
});
