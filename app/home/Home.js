module.exports = class Home {
    constructor() {
        this.myBarelz = {
            method: 'GET',
            path: '/myBarelz',
            handler: (req, res) => {
                MongoClient.connect(url, function(err, db) {
                    let collection = db.collection('barelz');
                    let barel = collection.find({
                        name: {"$in" : JSON.parse(req.query.barelz)}
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