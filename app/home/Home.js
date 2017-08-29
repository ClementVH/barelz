module.exports = class Home {
    constructor() {
        this.myBarelz = {
            method: 'GET',
            path: '/myBarelz',
            handler: (req, res) => {
                MongoClient.connect(url, function(err, db) {
                    let collection = db.collection('barelz');
                    let barel = collection.find({
                        _id: {"$in" : JSON.parse(req.query.barelz).map(id => new Mongo.ObjectID(id))}
                    }).toArray((err, barelz) => {
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
        }
    }
}