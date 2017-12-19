import bodyParser from 'body-parser';

const jwt = require('jsonwebtoken');

module.exports = app => {
    app.set("port", 3000);
    app.set("json spaces", 4);
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        delete req.body.id;
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
        res.header("Access-Control-Allow-Headers", "Content-Type, Origin, X-Requested-With, Accept, Lang, Authorization");

        if (req.method !== 'OPTIONS' && req.path !== "/login") {
            let auth = req.headers.authorization;
            if (auth !== undefined) {
                if(auth.indexOf('Bearer ') !== -1) {
                    let token = auth.split(' ');
                    jwt.verify(token[1], app.libs.config.secret, (error, decoded) => {
                        if(error !== null) {
                            return res.status(401).json({mensagem: "Token inválido"});
                        }
                        next();
                    });
                } else {
                    return res.status(401).json({mensagem: "Token inválido"});
                }
            } else {
                return res.status(401).json({mensagem: "Token inválido"});
            }
        } else {
            next();
        }
    
    });
        
};