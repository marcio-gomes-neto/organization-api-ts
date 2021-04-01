import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Organization from '../models/Organization'
import OrgUsers from '../models/OrgUsers';

const models = [Organization, OrgUsers];

const conn = new Sequelize(databaseConfig);

models.forEach((model) => { model.init(conn);});