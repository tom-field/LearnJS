'use strict';

const {app} = require('egg-mock/bootstrap');

describe('test/app/service/user.test.js', () => {
    describe('qnDelete', () => {
        it('should ok', async () => {
            const ctx = app.mockContext();
            await ctx.service.file.qnDelete('380e73c0-e3e4-11e8-b067-bbfdf64e9bbd.jpg');
        });
    });
});