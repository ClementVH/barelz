module.exports = class Library {
    constructor() {
        this.catalog = {
            method: 'GET',
            path: '/catalog',
            handler: (req, res) => {
                MongoClient.connect(url, function(err, db) {
                    let UserCollection = db.collection('users');
                    let BarelCollection = db.collection('barelz');
                    UserCollection.findOne({
                        username: req.state.access_token.username
                    }, {barelz: true}, (err, user) => {
                        BarelCollection.find({
                            _id: {
                                '$nin': user.barelz.map(id => new Mongo.ObjectID(id))
                            }
                        })
                            .sort({upvotes : -1})
                            .limit(25)
                            .toArray((err, barelz) => {
                                db.close();
                                res(barelz);
                            });
                    })
                });
            },
            config: {
                state: {
                    parse: true,
                    failAction: 'error'
                }
            }
        };

        this.addBarel = {
            method: 'POST',
            path: '/addBarel',
            handler: (req, res) => {
                MongoClient.connect(url, function(err, db) {
                    let collection = db.collection('users');
                    let barel = collection.updateOne({
                        username: req.state.access_token.username
                    }, {
                        $push: {
                            barelz: req.payload._id
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
    }
}