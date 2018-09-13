// Copy this file as config.js in the same folder, with the proper database connection URI.

module.exports = {
  db: `mongodb://${process.env.DB_HOST || 'localhost'}:27017/${
      process.env.DB
    }`,
  db_dev: `mongodb://${process.env.DB_HOST || 'localhost'}:27017/${
    process.env.DB
  }`,
};
