module.exports = () => {
    const Mongoose = require('mongoose');

    let usuario = new Mongoose.Schema({
        _id: {type: String},
        person_id: {type: String},
        user: {type: String, trim: true, required: true},
        password: {type: String, trim: true, required: true}
    })

    usuario.options.toJSON = {
        transform: function(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    };

    return Mongoose.model('users', usuario);
}