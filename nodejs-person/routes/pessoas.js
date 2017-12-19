module.exports = app => {

    const UsersBD = app.libs.config.userBD;
    const BD = app.libs.config.personBD;
    const uuidV4 = require('uuid/v4');
    const jwt = require('jsonwebtoken');

    app.route("/pessoas")
    
        .post((req, res) => {
            app.libs.logger.info('criar uma pessoa');

            if (req.body.name === undefined || req.body.name === null || req.body.name === "") {
                return res.status(400).json({mensagem: "Nome é obrigatório"});
            }

            var pessoa = req.body;
            pessoa._id = uuidV4();

            BD.create(req.body, (error, pessoa) => {
                if (error) return res.status(500).json({mensagem: error.message});
                return res.status(201).json(pessoa);
            });

        })

        .get((req, res) => {
            app.libs.logger.info('listar pessoas');
            let page = req.query.page;
            let limit = req.query.size;
            let personName = req.query.name;

            if(personName !== null && personName !== "" && personName !== undefined) {
                BD.paginate({name: new RegExp(personName, 'i') }, { page: page, limit: limit, sort: {name: 'asc'} }, (error, pessoas) => {
                    res.status(200).json(pessoas);
                });
            } else {
                BD.paginate({}, { page: page, limit: limit, sort:{name: 'asc'}}, (error, pessoas) => {
                    res.status(200).json(pessoas);
                });
            }

            
        })

    app.route("/pessoas/:id")

        .get((req, res) => {
            app.libs.logger.info('recuperar pessoa');
            BD.findOne({_id: req.params.id}, (error, pessoa) => {
                res.status(200).json(pessoa);
            });
        })

        .delete((req, res) => {
            app.libs.logger.info('deletar pessoa');
            BD.remove({_id: req.params.id}, (error, pessoa) => {
                UsersBD.remove({person_id: req.params.id}, (error, pessoa) => {
                    return res.sendStatus(204);
                })
            });
        })

        .put((req, res) => {
            if (req.body.name === undefined || req.body.name === null || req.body.name === "") {
                return res.status(400).json({mensagem: "Nome é obrigatório"});
            }

            BD.update({"_id": req.params.id}, req.body, {upset: true}, (error, person) => {
                if (error) return res.status(500).json({msg: error.message})
                return res.sendStatus(204);
            });
        })
}