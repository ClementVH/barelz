module.exports = class Auth {
    constructor() {
        this.login = {
            method: 'GET',
            path: '/login',
            handler: (req, res) => {
                MongoClient.connect(url, function(err, db) {
                    let collection = db.collection('users');
                    let user = collection.findOne({
                        username: req.query.username,
                        password: req.query.password
                    }, (err, user) => {
                        db.close();
                        if (!user) {
                            res("400").code(400);
                            return;
                        }
                        res({}).state('access_token', {"username": user.username});
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

        this.register = {
            method: 'POST',
            path: '/register',
            handler: (req, res) => {
                let credentials = req.payload;
                if (!credentials.username || !credentials.password /*|| !credentials.email*/) {
                    res("400").code(400);
                    return;
                }

                MongoClient.connect(url, function(err, db) {
                    let collection = db.collection('users');
                    let user = collection.insertOne({
                        username: credentials.username,
                        password: credentials.password,
                        /*email: credentials.email*/
                    }, (user) => {
                        db.close();
                        res({status: "OK"}).state('access_token', {"username": req.params.username});
                    });
                });
            }
        }
    }
}