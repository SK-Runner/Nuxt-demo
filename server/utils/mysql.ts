import mysql, { PoolOptions } from 'mysql2';

const access: PoolOptions = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'admin666',
  database: 'sys',
};

export default mysql.createPool(access).promise();
