const moment = require("moment")

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('category').del(),

    // Inserts seed entries
    knex('category').insert({
    	id: "ebfd88ef-9d3a-41e7-a528-990c6b67bb8c", name: "gallery", for: "gallery", description: "default gallery", datecreated: moment().utc().format('YYYY-MM-DD HH:mm:ss')
    }),
    knex('category').insert({
    	id: "5982624a-71f0-46a3-bc58-2d495c3d4099", name: "stream", for: "gallery", description: "default stream gallery", datecreated: moment().utc().format('YYYY-MM-DD HH:mm:ss')
    })
  );
};
