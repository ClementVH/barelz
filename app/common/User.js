module.exports = class User {
    constructor() {
        this.userInfos = {
            method: 'GET',
            path: '/userInfos',
            handler: (req, res) => {
                MongoClient.connect(url, function(err, db) {
                    let UserCollection = db.collection('users');
                    let user = {};
                    UserCollection.findOne({
                        username: req.state.access_token.username
                    }, {'username': true, 'barelz' : true}, (err, user) => {
                        user.username = user.username;
                        let BarelCollection = db.collection('barelz');
                        BarelCollection.find({
                            _id: {"$in" : user.barelz.map(id => new Mongo.ObjectID(id))}
                        }).toArray((err, barelz) => {
                            db.close();
                            user.barelz = barelz;
                            res(user);
                        });
                    });
                });
            },
            config: {
                state: {
                    parse: true,
                    failAction: 'error'
                }
            }
        };

        this.removeBarel = {
            method: 'GET',
            path: '/removeBarel',
            handler: (req, res) => {
                MongoClient.connect(url, function(err, db) {
                    let collection = db.collection('users');
                    let barel = collection.updateOne({
                        username: req.state.access_token.username
                    }, {
                        $pull: {
                            barelz: req.query._id
                        }
                    }, (err, result) => {
                        db.close();
                        res().code(200)
                    });
                });
            },
            config: {
                state: {
                    parse: true,
                    failAction: 'error'
                }
            }
        };

        this.contributions = {
            method: 'GET',
            path: '/contributions',
            handler: (req, res) => {
                MongoClient.connect(url, function(err, db) {
                    let UserCollection = db.collection('users');
                    UserCollection.findOne({
                        username: req.state.access_token.username
                    }, {'contributions': true}, (err, user) => {
                        let BarelCollection = db.collection('barelz');
                        BarelCollection.find({
                            _id: {"$in" : user.contributions.map(id => new Mongo.ObjectID(id))}
                        }).toArray((err, barelz) => {
                            db.close();
                            res(barelz);
                        });
                    });
                });
            },
            config: {
                state: {
                    parse: true,
                    failAction: 'error'
                }
            }
        };

        this.updateBarel = {
            method: 'POST',
            path: '/updateBarel',
            handler: (req, res) => {
                MongoClient.connect(url, function(err, db) {
                    let BarelCollection = db.collection('barelz');
                    let _id = req.payload.id;
                    delete req.payload.id;
                    BarelCollection.updateOne(
                    { _id: new Mongo.ObjectID(_id) },
                    {
                        '$set': req.payload
                    }, (err, barelz) => {
                        db.close();
                        res(barelz);
                    });
                });
            },
            config: {
                state: {
                    parse: true,
                    failAction: 'error'
                }
            }
        };
    }
}