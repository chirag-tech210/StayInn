const mongoose = require('mongoose');

let dbConnection = null;

const connectWithDB = () => {
  mongoose.set('strictQuery', false);
  return mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((connection) => {
      dbConnection = connection;
      console.log(`DB connected successfully`);
      return connection;
    })
    .catch((err) => {
      console.log(`DB connection failed`);
      console.log(err);
      process.exit(1);
    });
};

const getConnection = () => {
  return dbConnection;
};

module.exports = { connectWithDB, getConnection };
