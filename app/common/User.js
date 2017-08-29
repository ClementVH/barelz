module.exports = class User {
    constructor() {
        this.userInfos = {
            method: 'GET',
            path: '/userInfos',
            handler: (req, res) => {
                MongoClient.connect(url, function(err, db) {
                    let collection = db.collection('users');
                    let barel = collection.findOne({
                        username: req.state.access_token.username
                    }, {'barelz' : true}, (err, user) => {
                        db.close();
                        res(user.barelz);
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