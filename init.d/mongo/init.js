/* eslint-disable */

/**
 * 1. create custom user
 * 2. create collection (Before MongoDB can save your new database, a collection name must also be specified at the time of creation.)
 */
db.createUser({
  user: 'root',
  pwd: 'xuhui2014',
  roles: [
    {
      role: 'readWrite',
      db: 'egg_dream_into_real'
    }
  ]
})

db.egg_dream_into_real.insert({
    egg_dream_into_real: 'egg_dream_into_real'
})
