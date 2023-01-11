const knex = require('../../config/db');
const HttpError = require('../lib/utils/http-error');

// get by user-id
const getFavoritesByUserId = async (token) => {
  const userUid = token.split(' ')[1];
  const user = (await knex('users').where({ uid: userUid }))[0];

  if (!token) {
    throw new HttpError('There are not users', 401);
  }

  try {
    const favorites = await knex('products')
      .select('products.*', 'favorites.id as favoritesID')
      .leftJoin('favorites', function () {
        this.on('products.id', '=', 'favorites.product_id');
      })
      .where('favorites.user_id', '=', `${user.id}`);

    if (favorites.length === 0) {
      throw new HttpError(
        `There are no favorites available with this user`,
        404,
      );
    }

    return favorites;
  } catch (error) {
    return error.message;
  }
};

// post
const createFavorites = async (token, body) => {
  try {
    const userUid = token.split(' ')[1];
    const user = (await knex('users').where({ uid: userUid }))[0];
    if (!user) {
      throw new HttpError('User not found', 401);
    }
    await knex('favorites').insert({
      user_id: user.id,
      product_id: body.product_id,
    });
    return {
      successful: true,
    };
  } catch (error) {
    return error.message;
  }
};

// delete
const deleteFavorites = async (token, favId) => {
  const userUid = token.split(' ')[1];
  const user = (await knex('users').where({ uid: userUid }))[0];
  if (!user) {
    throw new HttpError('User not found', 401);
  }
  try {
    const deletedFav = await knex('favorites').where({ id: favId }).del();
    if (deletedFav === 0) {
      throw new HttpError('The favorites ID you provided does not exist.', 400);
    } else {
      return {
        successful: true,
      };
    }
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  getFavoritesByUserId,
  createFavorites,
  deleteFavorites,
};
