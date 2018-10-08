const moment = require('moment');
const bcrypt = require('bcryptjs');

exports.relativeTime = time => moment(new Date(time * 1000)).fromNow();
exports.bhash = str => {
    return bcrypt.hashSync(str, 10);
};