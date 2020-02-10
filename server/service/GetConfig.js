const mongoose = require('mongoose');
let ConfigSchema = require('../models/Config');
let ConfigDataBAse = require('./ConfigDataBase');

module.exports = () => {
  return new Promise((resolve, reject) => {
    ConfigSchema.findOne({'active':true}).then(config => {
      if (!config) {
        throw (`The active configuration not found`);
      }
      let mode = 'development';

      if (process.env.NODE_ENV) {
        mode = 'production';
      }

      process.env.domen = config[`${mode}`].domen.domenServer;
      process.env.domen_client = config[`${mode}`].domen.domenClient;
      process.env.urlDataBase = config[`${mode}`].database;
      process.env.cloudinary_cloud_name = config[`${mode}`].cloudinary.cloudName;
      process.env.cloudinary_apikey = config[`${mode}`].cloudinary.apiKey;
      process.env.cloudinary_apiSecret = config[`${mode}`].cloudinary.apiSecret;
      process.env.cloudinary_PATH = config[`${mode}`].cloudinary.path;
      process.env.JWT_SECRET = config[`${mode}`].JWT_SECRET;

      resolve(config[`${mode}`]);
    }).catch(error => {
      throw (error);
    })
  });
};
