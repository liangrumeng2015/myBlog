var express = require('express');
var router = express.Router();
var crypto = require('crypto');
const SECRET = 'abcdefg';
const jwt = require('jsonwebtoken');
require('../config/db')
const request = require('request');
var fs = require('fs');
var multiparty = require('multiparty');
const multer = require('multer');
const elementUserModel = require('../model/elementUser');
const ObjectId = require('mongodb').ObjectId; //mongodb自带对象

/**
 * 查看element里的接口是否可以正常访问
 */
router.get('/', (req, res) => {
    res.send({
        msg: 'element 接口可以正常访问'
    })
})

/**
 * auth  中间件token
 */
const auth = async (req, res, next) => {
    const raw = String(req.headers.authorization).split(' ').pop();
    const {
        id
    } = jwt.verify(raw, SECRET); // 解密token
    req.user = await elementUserModel.findById(id);
    next();
}

/**
 * 添加用户[注册用户]
 * @params username   用户名   [必传]
 * @params email     邮件    [必传]
 * @params phone   电话   [必传]
 * @params roles   角色   [必传]
 * @params status  状态   [必传]
 */
router.post('/addUser.do', async (req, res) => {
    const user = await elementUserModel.create({
        username: req.body.username,
        password: crypto.createHash('md5').update(req.body.password).digest("hex"),
        email: req.body.email,
        phone: req.body.phone,
        roles: req.body.roles,
        status: req.body.status
    }, (err, data) => {
        if (!err) {
            console.log(data);
            res.json({
                msg: '注册成功',
                module: data,
                success: true
            })
        } else {
            if (err.code == '11000') {
                res.json({
                    msg: '该用户名已经注册过了，请换个用户名',
                    success: false
                })
            } else {
                res.json({
                    msg: '注册失败，查看下后台日志',
                    success: false
                })
            }
        }
    })
})
/**
 * 登录接口
 * @params username  用户名   [必传]
 * @params password  密码  [必传]
 */
router.post('/toLogin.do', async (req, res) => {
    const result = await elementUserModel.findOne({
        username: req.body.username
    })

    if (result) {
        console.log('返回的结果===', result);
        const token = jwt.sign({
            id: String(result._id)
        }, SECRET)
        if (result.password == crypto.createHash('md5').update(req.body.password).digest("hex")) {
            return res.json({
                msg: '登录成功',
                token: token,
                success: true
            })
        } else {
            return res.json({
                msg: '密码不正确',
                success: false
            })
        }
    } else {
        return res.json({
            msg: '该用户暂未注册,请联系管理员',
            success: true
        })
    }
})


/**
 * 获取用户列表信息 [需要分页的]
 * @params pageNum   第几页的数据       [必传]
 * @params pageSize  一页显示几条数据    [必传]
 */
router.post('/getUsersList.do', async (req, res) => {
    const pageNum = Number(req.body.pageNum); // 第几页的数据
    const pageSize = Number(req.body.pageSize); // 一页显示几条数据

    const total = await elementUserModel.find({}).countDocuments();
    const list = await elementUserModel.find({}).skip((pageNum - 1) * pageSize).limit(pageSize);
    const pages = Math.ceil(total / pageSize); // 一共显示多少页
    if (list) {
        res.json({
            module: {
                list,
                total,
                pageNum,
                pageSize,
                pages
            },
            success: true
        })
    } else {
        res.json({
            module: [],
            msg: '暂无',
        })
    }
})

/**
 * 修改用户信息
 * @params username   用户名   [非必传]
 * @params email     邮件    [非必传]
 * @params phone   电话   [非必传]
 * @params roles   角色   [非必传]
 * @params status  状态   [非必传]
 */
router.post('/editUser.do', async (req, res) => {
    let username = req.body.username,
        email = req.body.email,
        phone = req.body.phone,
        roles = req.body.roles,
        status = req.body.status;
    var obj = {};
    if (username) {
        obj['username'] = username;
    }
    if (email) {
        obj['email'] = email;
    }
    if (phone) {
        obj['phone'] = phone;
    }
    if (roles) {
        obj['roles'] = roles;
    }
    if (status) {
        obj['status'] = status;
    }
    console.log('得到的对象obj', obj);

    await elementUserModel.updateOne({
        _id: ObjectId(req.body.id)
    }, {
        $set: obj
    }, (err) => {
        console.log(err);
        if (!err) {
            res.json({
                msg: '修改用户信息成功',
                success: true
            })
        } else {
            if (err.code == '11000') {
                res.json({
                    msg: '该用户名已被占用',
                    success: false
                })
            } else {
                res.json({
                    msg: '修改用户信息失败',
                    success: false
                })
            }
        }
    })
})

/**
 * 删除用户
 * @params  id   列表的_id值
 */
router.post('/deletUser.do', async (req, res) => {
    await elementUserModel.deleteOne({
        '_id': ObjectId(req.body.id)
    }, (err) => {
        if (!err) {
            res.json({
                msg: '删除成功',
                success: true
            })
        } else {
            console.log('报错信息', err);
        }
    })
})

/**
 * 查找用户  根据用户名中的关键字进行搜索
 * @params usernameTxt   用户名中的关键字
 */
router.post('/searchUsername.do', async (req, res) => {
    let usernameTxt = req.body.usernameTxt;
    await elementUserModel.find({
        username: {
            $regex: usernameTxt,
            $options: "$i"
        }
    }, (err, data) => {
        if (!err) {
            res.json({
                msg: '查询成功',
                module: data,
                success: true
            })
        } else {
            res.json({
                msg: '查询失败',
                success: false
            })
        }
    })
})


/**
 * ai识别文字接口的access_token,
 * 返回access_token，在下面文字识别的接口需要用到
 */
let accessToken;
router.post('/ai/getAccessToken.do',async(req,res)=>{  
    let client_id = 'yhnQUL7Sj1NuC2R2UXoGpoPn';    // api key
    let client_secret = 'tGQHbQg1SjmjPl2gcpvZ4G3a0zV1LYj0';   // secret key
    let url = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id='+client_id+'&client_secret='+client_secret;
    request(url,(err,data)=>{
        let body = JSON.parse(data.body);
        if(!err){
            accessToken = body.access_token
            res.json({
                token:accessToken,
                success:true
            })
        }else{
            res.json({
                msg:body,
                success:false
            })
        }
    })
})

/**
 * 上传文件 
 */
const upload = multer({dest:__dirname+'/uploads'})
let image;
router.post('/ai/upload.do', upload.single('file'),async(req,res)=>{

    const file = req.file;
    // 因为原本multer没有返回完整的文件链接，所以这里需要将完整的文件链接拼接返回
    file.url = `http://localhost:5000/uploads/${file.filename}`;
    // console.log(file);
    image = file.filename
    res.send(file)
    console.log('file.filename',file.filename);
    console.log('accessToken',accessToken)
    let url = 'https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic';
    let formData = {
        image:image,    
    }
    var param = qs.stringify({
        'access_token':accessToken
    })
    console.log('请求传回来的参数',req);
    request(url,{formData},(err,data)=>{
        if(!err){
            console.log(data)
            res.json({
                module:data,
                success:true
            })
        }else{
            console.log(err);
            res.json({
                msg:err,
                success:false
            })
        }
    })
})
/**
 * 文字识别接口
 * @params access_token     必传
 * @params image   必传   图像数据，base64编码后进行urlencode，且base64编码和urlencode后大小不超过4M，支持jpg,jpeg,png,bmp格式
 */
router.post('/ai/identifyTxt.do',async(req,res)=>{
    
})

module.exports = router;