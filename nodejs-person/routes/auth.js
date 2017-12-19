module.exports = app => {

    const PersonsBD = app.libs.config.personBD;
    const UsersBD = app.libs.config.userBD;
    const uuidV4 = require('uuid/v4');
    const jwt = require('jsonwebtoken');
    const md5 = require('md5');

    app.route("/login")
    
        .post((req, res) => {
            app.libs.logger.info('login no sistema');

            var auth = req.headers.authorization;

            if (auth !== null) {
                let lg = auth.split(' ');

                if(lg.length > 1) {
                    let dt = lg[1].split(':');

                    if(dt.length > 1) {
                        let user = dt[0];
                        let pass = dt[1];

                        if (user === undefined || user === null || user === "") {
                            return res.status(401).json({mensagem: "Usuário inválido"});
                        }
            
                        if (pass === undefined || pass === null || pass === "") {
                            return res.status(401).json({mensagem: "Senha inválida"});
                        }
            
                        let senha = md5(pass);

                        UsersBD.findOne({user: user}, (error, usuario) => {
                            if (usuario !== null) {
                                if(usuario.password === senha) {
                                    PersonsBD.findOne({_id: usuario.person_id}, (error, pessoa) => {
                                        if(pessoa != null) {
                                            var token = jwt.sign({exp: (Math.floor(Date.now() / 1000) + (60 * 60)), data: pessoa}, app.libs.config.secret);
                                            return res.status(201).json({token: token, date: Date.now(), person:{id:pessoa.id, name: pessoa.name, userName: user}});
                                        } else {
                                            return res.status(401).json({mensagem: "Usuário e/ou senha inválidos"});
                                        }
                                    });
                                } else {
                                    return res.status(401).json({mensagem: "Usuário e/ou senha inválidos"});
                                }
                            } else {
                                return res.status(401).json({mensagem: "Usuário e/ou senha inválidos"});
                            }
                        });
                    } else {
                        return res.status(401).json({mensagem: "Usuário e/ou senha inválidos"});
                    }
                } else {
                    return res.status(401).json({mensagem: "Usuário e/ou senha inválidos"});
                }
            } else {
                return res.status(401).json({mensagem: "Usuário e/ou senha inválidos"});
            }

        })
}