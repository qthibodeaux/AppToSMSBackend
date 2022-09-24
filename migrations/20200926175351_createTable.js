const createNotesTable = `
CREATE TABLE Notes (
    id serial primary key,
    uuid text,
    message text, 
    date text,
    time text, 
    destination text, 
    phonenumber text,
    ctime timestamptz,
    mtime timestamptz default current_timestamp
    );`

const dropNotesTable = `DROP TABLE "notes";`

exports.up = function(knex) {
    return knex.raw(createNotesTable)
  };
  
  exports.down = function(knex) {
    return knex.raw(dropNotesTable)
  };