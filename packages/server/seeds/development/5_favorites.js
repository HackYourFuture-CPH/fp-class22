/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('favorites').del();
  await knex('favorites').insert([
    { user_id: '1', product_id: '1' },
    { user_id: '2', product_id: '2' },
    { user_id: '3', product_id: '1' },
    { user_id: '4', product_id: '2' },
    { user_id: '2', product_id: '6' },
    { user_id: '2', product_id: '4' },
    { user_id: '2', product_id: '8' },
    { user_id: '2', product_id: '5' },
    { user_id: '2', product_id: '11' },
    { user_id: '2', product_id: '16' },
    { user_id: '3', product_id: '10' },
    { user_id: '3', product_id: '6' },
    { user_id: '3', product_id: '5' },
    { user_id: '3', product_id: '4' },
    { user_id: '3', product_id: '7' },
  ]);
};
