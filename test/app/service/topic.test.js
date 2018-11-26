const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/topic.test.js', () => {
    describe('testPopulate', () => {
        it('should ok', async () => {
            const ctx = app.mockContext();
            console.log(ctx);
            const [topic] = await ctx.service.topic.getTopicById('5bf7a5b2efc9d82334247a1f');
            assert(topic.id === '5bf7a5b2efc9d82334247a1f');
        });
    });
});