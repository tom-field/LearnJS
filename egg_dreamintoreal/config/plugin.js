'use strict';

// had enabled by egg
// exports.static = true;
exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks'
};

exports.mongoose = {
    enable: true,
    package: 'egg-mongoose',
};

exports.passport = {
    enable: true,
    package: 'egg-passport',
};
exports.passportGithub = {
    enable: true,
    package: 'egg-passport-github',
};
exports.passportGoogle = {
    enable: true,
    package: 'egg-passport-google',
};