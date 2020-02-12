const mongoose = require('mongoose');
const ConnectToConfigDB = require('../service/ConnectToConfigDB');
const Schema = mongoose.Schema;


const ConfigSchema = new Schema({
    customId: {
        type: String,
        require: true
    },
    active:{
        type:Boolean,
        require:true,
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
        nodemailer: {
            email: {
                type: String,
                require: true
            },
            password: {
                type: String,
                require: true
            },
            service: {
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
        auth: {
            JWT_SECRET: {
                type: String,
                require: true
            },
            JWT_EMAIL_SECRET: {
                type: String,
                require: true
            },
            JWT_FORGOT_PASSWORD: {
                type: String,
                require: true
            },
            oauth: {
                google: {
                    clientID: {
                        type: String,
                        require: true
                    },
                    clientSecret: {
                        type: String,
                        require: true
                    }
                },
                facebook: {
                    clientID: {
                        type: String,
                        require: true
                    },
                    clientSecret: {
                        type: String,
                        require: true
                    }
                },
                github: {
                    clientID: {
                        type: String,
                        require: true
                    },
                    clientSecret: {
                        type: String,
                        require: true
                    }
                }
            }
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
        nodemailer: {
            email: {
                type: String,
                require: true

            },
            password: {
                type: String,
                require: true

            },
            service: {
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
        auth: {
            JWT_SECRET: {
                type: String,
                require: true

            },
            JWT_EMAIL_SECRET: {
                type: String,
                require: true

            },
            JWT_FORGOT_PASSWORD: {
                type: String,
                require: true

            },
            oauth: {
                google: {
                    clientID: {
                        type: String,
                        require: true
                    },
                    clientSecret: {
                        type: String,
                        require: true

                    }
                },
                facebook: {
                    clientID: {
                        type: String,
                        require: true
                    },
                    clientSecret: {
                        type: String,
                        require: true

                    }
                },
                github: {
                    clientID: {
                        type: String,
                        require: true
                    },
                    clientSecret: {
                        type: String,
                        require: true

                    }
                }
            }
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = ConnectToConfigDB.model("configs", ConfigSchema);
