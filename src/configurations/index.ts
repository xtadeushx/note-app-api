export default () => ({
  port: process.env.PORT || 3000,
  db_port: process.env.DB_PORT,
  db_host: process.env.DB_HOST,
  db_password: process.env.DB_PASSWORD,
  db_user: process.env.DB_USER,
  db_name: process.env.DB_NAME,
  db_dialect: process.env.DB_DIALECT,
});
