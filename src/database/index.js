import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Organization from '../models/Organization'

const models = [Organization];

const conn = new Sequelize(databaseConfig);

models.forEach((model) => { model.init(conn);});