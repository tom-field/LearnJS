const fs = require('mz/fs');
const path = require('path');
const pump = require('mz-modules/pump');
const uuidv1 = require('uuid/v1');
const moment = require('moment');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const gm = require('gm').subClass({imageMagick: true});
const util = require('util');

//文件处理
const Controller = require('egg').Controller;

class fileController extends Controller {
    //本地上传单文件和其他字段 config.multipart stream形式
    async upload() {
        const {ctx, config} = this;
        const uid = uuidv1();
        const stream = await ctx.getFileStream();
        const filename = uid + path.extname(stream.filename).toLowerCase();

        //生成文件夹 ES6 Node
        const dirname = moment(Date.now()).format('YYYYMMDD');
        const dirpath = path.join(config.upload.path, dirname);
        /*if (!fs.existsSync(dirpath)) {
            fs.mkdirSync(path.join(config.upload.path, dirname))
        }*/
        if (!await fs.exists(dirpath)) {
            await fs.mkdir(path.join(config.upload.path, dirname))
        }
        //生成写入路径
        const target = path.join(dirpath, filename);
        //const resizeTarget = path.join(config.upload.path,"resize",dirname,filename);
        //写入流
        const writeStream = fs.createWriteStream(target);
        try {
            await awaitWriteStream(stream.pipe(writeStream));
            //TODO linux可以 windows需要安裝軟件吧 影响windows开发暂注释
            /*gm(target).resize(resizeTarget,(err=>{
                if(err){
                    throw err;
                }
            }))*/
            ctx.body = {
                success: true,
                url: config.upload.url + '/dirname' + filename,
                fields: stream.fields,
            };
        } catch (err) {
            // 将上传的文件流消费掉，避免浏览器卡死
            await sendToWormhole(stream);
            throw err;
        }
    }

    //上传多个文件带其他字段 config.multipart file形式
    async uploads() {
        const {ctx, config, logger} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));
        const files = ctx.request.files;
        logger.warn('files: %j', files);
        //生成文件夹
        const dirname = moment(Date.now()).format('YYYYMMDD');
        const dirpath = path.join(config.upload.path, dirname);
        if (!await fs.exists(dirpath)) {
            await fs.mkdir(path.join(config.upload.path, dirname))
        }
        //遍历文件
        for (const file of files) {
            const uid = uuidv1();
            const filename = uid + path.extname(file.filename).toLowerCase();
            const targetPath = path.join(dirpath, filename);
            const source = fs.createReadStream(file.filepath);
            const target = fs.createWriteStream(targetPath);
            await pump(source, target);
            logger.warn('save %s to %s', file.filepath, targetPath);
            //delete tmp file
            await fs.unlink(file.filepath);
        }

        const fields = [];
        for (const key in ctx.request.body) {
            fields.push({
                key: key,
                value: ctx.request.body[key],
            });
        }

        ret.code = 0;
        ret.data = fields;
        ctx.body = ret;
    }

    // config.multipart stream 形式上传多文件
    async uploadStream(){
        const {ctx, config} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const parts = ctx.multipart({ autoFields: true });
        const files = [];
        //生成文件夹
        const dirname = moment(Date.now()).format('YYYYMMDD');
        const dirpath = path.join(config.upload.path, dirname);
        if (!await fs.exists(dirpath)) {
            await fs.mkdir(path.join(config.upload.path, dirname))
        }
        //文件写入
        let stream;
        while ((stream = await parts()) != null) {
            const uid = uuidv1();
            const filename =  uid + path.extname(stream.filename).toLowerCase();
            const target = path.join(dirpath, filename);
            const writeStream = fs.createWriteStream(target);
            await pump(stream, writeStream);
            files.push(filename);
        }
        //其他字段
        const fields = [];
        for (const key in parts.field) {
            fields.push({
                key: key,
                value: parts.field[key],
            });
        }

        ret.code = 0;
        ret.data = fields;
        ctx.body = ret;
    }

}

module.exports = fileController;