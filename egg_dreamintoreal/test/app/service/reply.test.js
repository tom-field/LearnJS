'use strict';

const {app} = require('egg-mock/bootstrap');
const assert = require('assert');

describe('test/app/service/reply.test.js', () => {
    describe('getLastReplyByTopId', () => {
        it('should ok', async () => {
            const ctx = app.mockContext();
            await ctx.service.reply.getLastReplyByTopId('5baee57f99f7865178b87fc0');
        });
    });
});