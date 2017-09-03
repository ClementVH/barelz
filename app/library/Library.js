module.exports = class Library {
    constructor() {
        this.catalog = {
            method: 'GET',
            path: '/catalog',
            handler: (req, res) => {
                MongoClient.connect(url, function(err, db) {
                    let collection = db.collection('barelz');
                    let barel = collection.find({})
                        .sort({upvotes : -1})
                        .limit(25)
                        .toArray((err, barelz) => {
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