import Sequelize, { Model } from 'sequelize';

export default class OrgUsers extends Model {
    static init(sequelize) {
      super.init({
        organizationId:Sequelize.INTEGER,
        nome: Sequelize.STRING,
        
        email: {
          type: Sequelize.STRING,
          validate: {
            isEmail: {
              msg: 'Invalid Mail!',
            },
          },
        },
        
        sexo: Sequelize.STRING,
        data_nasc: Sequelize.STRING,
        telefone: Sequelize.STRING,
      },{
        sequelize,
        tableName: 'orgUsers',
      });
      return this;
    }
  }
  