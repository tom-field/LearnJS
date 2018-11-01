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
      db: 'egg_cnode'
    }
  ]
})

db.egg_cnode.insert({
  egg_cnode: 'egg-cnode'
})
