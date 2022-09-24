
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, uuid: '001', message: 'Jess', time: '08:25:30.634458', date: '05-17-2020', destination: 'Dallas', phonenumber: '214-597-8581'},
        {id: 2, uuid: '002', message: 'Q', time: '08:25:30.634458', date: '04-16-2020', destination: 'Hempstead', phonenumber: '979-826-8840'},
        {id: 3, uuid: '003', message: 'TylerJames', time: '08:25:30.634458', date: '08-12-2020', destination: 'Houston', phonenumber: '281-734-8561'},
      ]);
    });
};