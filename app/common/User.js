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
        }
    }
}