module.exports = () => {
    const Mongoose = require('mongoose');
    const MongoosePaginate = require('mongoose-paginate');

    let pessoa = new Mongoose.Schema({
        _id: {type: String},
        name: {type: String, trim: true, required: true},
        birthDate: {type: Date},
        addresses:[
            {
                //_id: {type: String},
                address: {type: String},
                city: {type: String},
                state: {type: String},
                zipcode: {type: Number}
            }
        ],
        phones:[
            {
               // _id: {type: String},
                number: {type: String},
                type: {type: String}
            }
        ],
        emails:[
            {
                //_id: {type: String},
                email: {type: String},
                type: {type: String}
            }
        ]

    })

    pessoa.options.toJSON = {
        transform: function(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;

            for(var i=0, len=ret.addresses.length; i<len; i++) {
                delete ret.addresses[i]._id;
            }

            for(var i=0, len=ret.phones.length; i<len; i++) {
                delete ret.phones[i]._id;
            }

            for(var i=0, len=ret.emails.length; i<len; i++) {
                delete ret.emails[i]._id;
            }
        }
    };

    pessoa.plugin(MongoosePaginate);

    return Mongoose.model('persons', pessoa);
}