const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');

// get users
const getUsers = async () => {
  try {
    const users = await knex.select().table('users');
    if (users.length === 0) {
      throw new HttpError('No users found', 404);
    }
    return users;
  } catch (error) {
    return error.message;
  }
};

// post
const createUsers = async (body) => {
  try {
    await knex('users').insert({
      full_name: body.full_name,
      email: body.email,
      uid: body.uid,
    });
    return {
      successful: true,
    };
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getUsers,
  createUsers,
};
