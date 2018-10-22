const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1');
const moment = require('moment');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const formidable = require('formidable');
const gm = require('gm').subClass({imageMagick: true});
const util = require('util');

//文件处理
const Controller = require('egg').Controller;

class fileController extends Controller {
    //本地上传单文件
    async upload() {
        const {ctx, config, service} = this;
        const uid = uuidv1();
        const stream = await ctx.getFileStream();
        const filename = uid + path.extname(stream.filename).toLowerCase();

        //生成文件夹
        const dirname = moment(Date.now()).format('YYYYMMDD');
        if(!fs.existsSync(dirname)){
            fs.mkdirSync(path.join(config.upload.path,dirname))
        }
        //生成写入路径
        const target = path.join(config.upload.path,dirname,filename);
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
            };
        } catch (err) {
            // 将上传的文件流消费掉，避免浏览器卡死
            await sendToWormhole(stream);
            throw err;
        }
    }

    //TODO 本地上传文件可以加其他字段
    async uploads(){
        const { ctx, config, service } = this;
        let ret = JSON.parse(JSON.stringify(config.ret));
        const parts = ctx.multipart() // 返回的是Promise
        const stream = await ctx.getFileStream()
        let part;
        while ((part = await parts()) !== null) {
            // 如果是数组，是filed
            if (part.length) {
                console.log(`field: ${part[0]}`)
                console.log(`value: ${part[1]}`)
                console.log(`valueTruncated: ${part[2]}`)
                console.log(`filedNameTruncated: ${part[3]}`)
            } else {
                // 若用户不选择文件就上传，那么part是file stream，但part.filename为空
                if (!part.filename) {
                    return;
                }
                // 获取信息
                console.log(`field: ${part.fieldname}`)
                console.log(`filename: ${part.filename}`)
                console.log(`encoding: ${part.encoding}`)
                console.log(`mime: ${part.mime}`)
                // 文件存储
                let result
                try {
                    //result = await ctx.oss.put(name, stream);
                    ret.code = 0;
                    ret.data = config.upload.url + filename;
                    ctx.body = ret;
                } catch(err) {
                    // 将上传的文件流消费掉，避免浏览器卡死
                    await sendToWormhole(stream)
                    throw err
                }
            }
        }
    }

}

module.exports = fileController;