/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('orders').del();
  await knex('orders').insert([
    { user_id: 1, status: 'confirmed' },
    { user_id: 2, status: 'created' },
    { user_id: 3, status: 'confirmed' },
    { user_id: 4, status: 'created' },
    { user_id: 5, status: 'created' },
  ]);
};
