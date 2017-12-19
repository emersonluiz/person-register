module.exports = app => {
    
    const PersonsBD = app.libs.config.personBD;
    const UsersBD = app.libs.config.userBD;
    const uuidV4 = require('uuid/v4');
    const jwt = require('jsonwebtoken');
    const md5 = require('md5');

    app.route("/pessoas/:personId/usuarios")
    
        .post((req, res) => {
            app.libs.logger.info('criar um usuario');

            if (req.params.personId === undefined || req.params.personId === null || req.params.personId === "") {
                return res.status(404).json({mensagem: "Pessoa não encontrada"});
            }

            if (req.body.user === undefined || req.body.user === null || req.body.user === "") {
                return res.status(400).json({mensagem: "Usuário é obrigatório"});
            }

            if (req.body.password === undefined || req.body.password === null || req.body.password === "") {
                return res.status(400).json({mensagem: "Senha é obrigatório"});
            }

            PersonsBD.findOne({_id: req.params.personId}, (error, pessoa) => {
                if(pessoa === null || pessoa === undefined || pessoa === "") {
                    return res.status(404).json({mensagem: "Pessoa não encontrada"});
                } else {
                    let user = req.body;
                    user.password = md5(user.password);
                    user.person_id = req.params.personId;
                    user._id = uuidV4();

                    UsersBD.create(user, (error, usuario) => {
                        if (error) return res.status(500).json({mensagem: error.message});
                        return res.status(201).json(usuario);
                    });
                }
            })
        })

        .get((req, res) => {
            app.libs.logger.info('recuperar um usuario');
            UsersBD.findOne({person_id: req.params.personId}, (error, usuario) => {
                if(usuario !== null && usuario !== undefined) {
                    usuario.password = null;
                    res.status(200).json(usuario);
                } else {
                    res.status(404).json({mensagem: "Usuário não encontrado"});
                }
                
            });
        })

    app.route("/pessoas/:personId/usuarios/:userId")

            .delete((req, res) => {
                app.libs.logger.info('deletar um usuario');
                UsersBD.remove({_id: req.params.userId, person_id: req.params.personId}, (error, usuario) => {
                    return res.sendStatus(204);
                });
            })

            .put((req, res) => {
                if (req.params.personId === undefined || req.params.persnoId === null || req.params.personId === "") {
                    return res.status(404).json({mensagem: "Pessoa não encontrada"});
                }
    
                if (req.body.user === undefined || req.body.user === null || req.body.user === "") {
                    return res.status(400).json({mensagem: "Usuário é obrigatório"});
                }

                PersonsBD.findOne({_id: req.params.personId}, (error, pessoa) => {
                    if(pessoa === null || pessoa === undefined || pessoa === "") {
                        return res.status(404).json({mensagem: "Pessoa não encontrada"});
                    } else {
                        if (req.body.password === undefined || req.body.password === null || req.body.password === "") {
                            UsersBD.findOne({_id: req.params.userId, person_id: req.params.personId}, (error, usuario) => {
                                req.body.password = usuario.password;

                                UsersBD.update({"_id": req.params.userId}, req.body, {upset: true}, (error, usuario) => {
                                    if (error) return res.status(500).json({msg: error.message})
                                    return res.sendStatus(204);
                                });
                            });
                        } else {
                            req.body.password = md5(req.body.password);
                            UsersBD.update({"_id": req.params.userId}, req.body, {upset: true}, (error, usuario) => {
                                if (error) return res.status(500).json({msg: error.message})
                                return res.sendStatus(204);
                            });
                        }
                    }
                })
            })
}