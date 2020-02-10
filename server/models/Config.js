const mongoose = require('mongoose');
const ConnectToConfigDB = require('../service/ConnectToConfigDB');
const Schema = mongoose.Schema;


const ConfigSchema = new Schema({
    customId: {
        type: String,
        require: true
    },
    active: {
        type: Boolean,
        require: true,
        default: false
    },
    development: {
        domen: {
            domenServer: {
                type: String,
                require: true
            },
            domenClient: {
                type: String,
                require: true
            }
        },
        database: {
            uri: {
                type: String,
                require: true
            }
        },
        cloudinary: {
            cloudName: {
                type: String,
                require: true
            },
            apiKey: {
                type: String,
                require: true
            },
            apiSecret: {
                type: String,
                require: true
            },
            path: {
                type: String,
                require: true
            }
        },
        JWT_SECRET: {
            type: String,
            require: true
        }

    },
    production: {
        domen: {
            domenServer: {
                type: String,
                require: true
            },
            domenClient: {
                type: String,
                require: true
            }
        },
        database: {
            uri: {
                type: String,
                require: true
            }
        },
        cloudinary: {
            cloudName: {
                type: String,
                require: true

            },
            apiKey: {
                type: String,
                require: true

            },
            apiSecret: {
                type: String,
                require: true
            },
            path: {
                type: String,
                require: true
            }
        },
        JWT_SECRET: {
            type: String,
            require: true
        },
    }
});


module.exports = ConnectToConfigDB.model("configs", ConfigSchema);
