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
      //https://docs.mongodb.com/manual/reference/built-in-roles/#built-in-roles
      role: 'readWrite',
      db: 'egg_dream_into_real'
    }
  ],
})

db.egg_dream_into_real.insert({
    egg_dream_into_real: 'egg_dream_into_real'
})

//角色说明：
//Read：允许用户读取指定数据库
//readWrite：允许用户读写指定数据库
//dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile
//userAdmin：允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户
//clusterAdmin：只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。
//readAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读权限
//readWriteAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读写权限
//userAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限
//dbAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限。
//root：只在admin数据库中可用。超级账号，超级权限
