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
  ]);
};
