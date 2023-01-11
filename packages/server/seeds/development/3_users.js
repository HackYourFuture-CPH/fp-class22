/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('users').del();
  await knex('users').insert([
    { full_name: 'Ada Lovelace', email: 'ada@lovelace.com' },
    {
      full_name: 'Yuliia Balandiuk',
      email: 'yuliia.balandiuk8@gmail.com',
      uid: 'xldO7sqxtogZ41t4z9gdcMwQFGE2',
    },
    {
      full_name: 'Manisha Patel',
      email: 'manisha270989@gmail.com',
      uid: 'oD1PBISySCWtlYTz0kSACN5MLIp1',
    },
    { full_name: 'Alan Turing', email: 'alan@turing.com' },
    { full_name: 'Steve Jobs', email: 'steve@jobs.com' },
  ]);
};
