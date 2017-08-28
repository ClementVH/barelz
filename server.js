const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

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
global.MongoClient = require('mongodb').MongoClient
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

server.start((err) => {

    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
});
