require('dotenv').config();

module.exports = {
  dialect: 'mariadb',
  host: '34.95.181.150',
  port: '3306',
  username: 'root',
  password: '7/***asiqw__=asjeio',
  database: 'usersAPI',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    'createdAt': 'created_at',
    'updatedAt': 'updated_at',
  },
  dialectOptions: {
    timezone: 'America/Sao_Paulo',
  },
  timezone: 'America/Sao_Paulo',

};
