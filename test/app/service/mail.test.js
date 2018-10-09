'use strict';

const {app} = require('egg-mock/bootstrap');

describe('test/app/service/mail.test.js', () => {
    describe('sendActiveMail', () => {
        it('should ok', async () => {
            const ctx = app.mockContext();
            await ctx.service.mail.sendActiveMail('xuhui@juzhen.io', 'token', 'sinchang');
        });
    });
    describe('sendResetPassMail', function () {
        it('should ok', async () => {
            const ctx = app.mockContext();
            await ctx.service.mail.sendResetPassMail('xuhui@juzhen.io', 'token', 'sinchang');
        });
    });
});
