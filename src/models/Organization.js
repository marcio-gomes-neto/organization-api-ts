import Sequelize, { Model } from 'sequelize';

export default class Organization extends Model {
  static init(sequelize) {
    super.init({
      cnpj: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'This CNPJ is already in use',
        },
      },
      rsocial: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        validate: {
          isEmail: {
            msg: 'Invalid Mail!',
          },
        },
      },
      endereco: Sequelize.STRING,
      cidade: Sequelize.STRING,
      estado: Sequelize.STRING,
      contato: Sequelize.STRING,
      telefone: Sequelize.STRING,
    }, {
      sequelize,
      tableName: 'organization',
    });
    return this;
  }
}
