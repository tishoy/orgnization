var fetch = require('node-fetch');
var chai = require('chai');
var assert = require('assert');
// var config = require('../src/config');

let expect = chai.expect;

let routers = "http://192.168.4.43:8010/index.php?m=train&c=route&a=client_route";
let addr = "http://192.168.4.43:8010/index.php?m=train";
var routes = {
    "login": addr + "&c=users&a=login",
    "register": addr + "&c=users&a=regist",
    "available": addr + "&c=users&a=available",
    "logout": addr + "&c=users&a=logout",
    "reset": addr + "&c=users&a=reset",
    "info": addr + "&c=query&a=info",

    "insert": addr + "&c=students&a=insert",
    "remove": addr + "&c=students&a=remove",
    "base": addr + "&c=students&a=base",
    "self": addr + "&c=students&a=self",
    "addexp": addr + "&c=students&a=addexp",
    "delexp": addr + "&c=students&a=delexp",
    "studentsInfo": addr + "&c=students&a=info",
    "studentsInfos": addr + "&c=students&a=infos",

    "examing": addr + "&c=exams&a=examing",
    "pass": addr + "&c=exams&a=pass",
    "retry": addr + "&c=exams&a=retry",
    "score": addr + "&c=exams&a=score",
    "over": addr + "&c=exams&a=over",

    "enroll": addr + "&c=enrolled&a=enroll",
    "agree": addr + "&c=enrolled&a=agree",
    "refuse": addr + "&c=enrolled&a=refuse",

    "createClass": addr + "&c=clazz&a=createClass",
    "editClass": addr + "&c=clazz&a=editClass",
    "delClass": addr + "&c=clazz&a=delClass",
    "classinfos": addr + "&c=clazz&a=classinfos",
    

    "createArea": addr + "&c=area&a=createArea ",
    "delArea": addr + "&c=area&a=delArea",
    "areaInfos": addr + "&c=area&a=areaInfos ",

    "query": addr + "&c=query&a=info",
}

let header = {
    method: 'POST',
    mode: 'cors',
    cache: 'default',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www.form-urlencoded'
    },
}

// var session = "XzZG17"

describe('服务器API测试', function () {

    it('请求路由', function () {
        return fetch(routers, Object.assign(header,
            { body: JSON.stringify({ version: "0.0.1" }) }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            //  console.log(json);

            expect(json).to.be.an('object');
            // 请求路由 希望也有错误码0 
            // expect(json.code).to.be.a('number');
        });
    });

    it('请求登录-成功-10006', function () {
        return fetch(routes.login, Object.assign(header,
            { body: JSON.stringify({ account: "tishoy", password: "hantishoy", type: 1 }) }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {

            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            session = json.session;
            console.log(session);
            assert.notEqual([10006].indexOf(json.code), -1);
            if (json.code == 10006) {
                console.log(json.session);
                expect(json.data).to.be.an('object');
                expect(json.data.student).to.be.an('array');
            }
        });
    });

    it('请求登录-失败1-用户不存在-10005', function () {
        return fetch(routes.login, Object.assign(header,
            { body: JSON.stringify({ account: "不存在的用户", password: "hantishoy", type: 1 }) }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            console.log(json);
            assert.equal(10005, json.code);
        });
    });

    it('请求登录-失败2-密码错误-10007', function () {
        return fetch(routes.login, Object.assign(header,
            { body: JSON.stringify({ account: "tishoy", password: "ccc", type: 1 }) }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            // console.log(json);
            assert.equal(10007, json.code);
            /*if (json.code == 10006) {
                console.log(json.session);
                expect(json.data).to.be.an('object');
                expect(json.data.student).to.be.an('array');
            }*/
        });
    });

    it('请求登录-其他', function () {
        return fetch(routes.login, Object.assign(header,
            { body: "" }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            console.log(json)
        });
    });

    /*
        it('请求注册', function () {
            return fetch(routes.register, Object.assign(header,
                { body: JSON.stringify({ account: [1, 2, 3, 4], password: "123", type: 1 }) }
            )).then(function (res) {
                return res.json();
            }).then(function (json) {
                console.log(json);
                expect(json).to.be.an('object');
                expect(json.code).to.be.a('number');
                // 没有不成功的时候么？ 有！ 
                assert.notEqual([10001, 10003, 10004].indexOf(json.code), -1);
            });
        });
        */
    /*       it('用户名可用-该账号已注册-10001', function () {
            return fetch(routes.available, Object.assign(header,
                { body: JSON.stringify({ account: [1, 2, 3, 4], type: 1 }) }
            )).then(function (res) {
                return res.json();
            }).then(function (json) {
                expect(json).to.be.an('object');
                expect(json.code).to.be.a('number');
               assert.equal(10001, json.code);
            });
        });
        
        it('用户名可用-该账号可以使用-10002', function () {
            return fetch(routes.available, Object.assign(header,
                { body: JSON.stringify({ account: "一三五", type: 1 }) }
            )).then(function (res) {
                return res.json();
            }).then(function (json) {
                expect(json).to.be.an('object');
                expect(json.code).to.be.a('number');
                assert.equal(10002, json.code);
            });
        });
    
    */
    it('用户登出-退出登录-10013', function () {
        console.log(session);
        return fetch(routes.logout, Object.assign(header,
            { body: JSON.stringify({ session: session }) }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            assert.equal(10013, json.code);
        });
    });
    
    it('用户登出-用户不存在-10014', function () {
        console.log(session);
        return fetch(routes.logout, Object.assign(header,
            { body: JSON.stringify({ session: "session" }) }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            assert.equal(10014, json.code);
        });
    });


    it('用户设置', function () {
        return fetch(routes.reset, Object.assign(header,
            {
                body: JSON.stringify({
                    session: session, base: {
                        "company_name": "中软1",
                        "province": "4",
                        "qualification": "1"
                    }
                })
            }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            console.log(json);
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            assert.notEqual([0, 10011, 10012].indexOf(json.code), -1);
        });
    });

    it('用户信息', function () {
        return fetch(routes.info, Object.assign(header,
            { body: JSON.stringify({ session: session }) }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            assert.notEqual([0, 10045].indexOf(json.code), -1);
        });
    });


    /*    it('插入学生', function () {
            return fetch(routes.insert, Object.assign(header,
                {
                    body: JSON.stringify({
                        session: session, student: {
                            "id": 13,
                            "base_info": {
                                "name": "tishoy1",
                                "tel": "13810100010",
                                "email": "tishoy",
                                "city": 0,
                                "level": 2,
                                "company": "中软"
                            },
                            "personal_info": {
                                licence:{
                                    "code" : "232700198902230021",
                                    "type" : "身份证"
                                },
                                "edu": "QH University",
                                "working_time": "5 year",
                                "total_amount": "",
                                "soft_amount": ""
                            },
                            "proj_exp": [
                                {
                                    "id": 1,
                                    "name": "支付宝",
                                    "time": 1587515789,
                                    "actor": "经理",
                                    "total_amount": "100万",
                                    "soft_amount": "50万"
                                },
                                {
                                    "id": 1,
                                    "name": "支付宝",
                                    "time": 1587515789,
                                    "actor": "经理",
                                    "total_amount": "100万",
                                    "soft_amount": "50万"
                                },
    
                            ],
                            // 状态 0 未进行 1 进行中 2 进行结束
                            "status": {
                                "enrolled": {
                                    "status": 0,
                                    "time": 1500262255
                                },
                                "arranged": {
                                    "status": 2,
                                    "time": 1500262255
                                },
                                "agreed": {
                                    "status": 0,
                                    "time": 1500262255
                                },
                                "examing": {
                                    "status": 1,
                                    "time": 1500262255
                                },
                                "passed": {
                                    "status": 1,
                                    "score": 96,
                                    "time": 1500262255
                                },
                                "retry": {
                                    "status": 1,
                                    "time": 1500262255
                                }
                            }
                        }
                    })
                }
            )).then(function (res) {
                return res.json();
            }).then(function (json) {
                expect(json).to.be.an('object');
                expect(json.code).to.be.a('number');
               // console.log(json)
                // 这里返回10002？ 
                assert.notEqual([0, 10015, 10016].indexOf(json.code), -1);
            });
        })*/



    it('删除学生', function () {
        return fetch(routes.remove, Object.assign(header,
            { body: JSON.stringify({ session: session, id: 12 }) }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            console.log(json);
            assert.notEqual([0, 10017, 100171].indexOf(json.code), -1);
        });
    })



    it('修改学员基础信息', function () {
        return fetch(routes.base, Object.assign(header,
            {
                body: JSON.stringify({
                    session: session, id: 12, base_info: {
                        "name": "tishoy1",
                        "tel": "13810100010",
                        "email": "tishoy",
                        "city": 0,
                        "level": 2,
                        "company": "中软"
                    }
                })
            }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            assert.notEqual([0, 10018, 100181].indexOf(json.code), -1);
        });
    })




    it('修改个人信息', function () {
        return fetch(routes.self, Object.assign(header,
            {
                body: JSON.stringify({
                    session: session, id: 12, "personal_info": {
                        "licence": "232700198902230021",
                        "edu": "QH University",
                        "working_time": "5 year",
                        "total_amount": "",
                        "soft_amount": ""
                    }
                })
            }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            assert.notEqual([0, 10018, 100181].indexOf(json.code), -1);
        });
    })

    it('增加经验', function () {
        return fetch(routes.addexp, Object.assign(header,
            {
                body: JSON.stringify({
                    session: session, id: 12, exp: {
                        "id": "1",
                        "name": "nonono",
                        "time": 1234567890,
                        "actor": "范德萨",
                        "total_amount": "范德萨",
                        "soft_amount": "放大"
                    }
                })
            }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            assert.notEqual([0].indexOf(json.code), -1);
        });
    })

    it('删除项目经验', function () {
        return fetch(routes.delexp, Object.assign(header,
            { body: JSON.stringify({ session: session, id: 12, exp_id: 12 }) }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            assert.notEqual([0].indexOf(json.code), -1);
        });
    })

    it('单个学生信息', function () {
        return fetch(routes.studentsInfo, Object.assign(header,
            // 为12号学生安排 
            { body: JSON.stringify({ session: session, id: 12 }) }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            assert.notEqual([0, 10019, 100191].indexOf(json.code), -1);
        });
    })

    it('所有学生信息', function () {
        return fetch(routes.studentsInfos, Object.assign(header,
            { body: JSON.stringify({ session: session }) }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            assert.notEqual([0].indexOf(json.code), -1);
            if (json.code === 0) {
                expect(json.data.student).to.be.an('array');
            }
        });
    })


    it('安排考试', function () {
        return fetch(routes.examing, Object.assign(header,
            // 为12号学生安排 id为2的考试
            { body: JSON.stringify({ session: session, id: 12, exam: 2 }) }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            assert.notEqual([0].indexOf(json.code), -1);
        });
    })

    it('考试通过', function () {
        return fetch(routes.pass, Object.assign(header,
            // 12号学生通过考试
            { body: JSON.stringify({ session: session, id: 12 }) }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            assert.notEqual([0].indexOf(json.code), -1);
        });
    })

    it('重报名考试', function () {
        return fetch(routes.retry, Object.assign(header,
            { body: JSON.stringify({ session: session, id: 12 }) }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            assert.notEqual([0].indexOf(json.code), -1);
        });
    })

    it('考试分数', function () {
        return fetch(routes.score, Object.assign(header,
            { body: JSON.stringify({ session: session, id: 12, score: 80 }) }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            assert.notEqual([0].indexOf(json.code), -1);
        });
    })

    it('考试结束', function () {
        return fetch(routes.over, Object.assign(header,
            { body: JSON.stringify({ session: session, id: 12 }) }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            assert.notEqual([0, 10029, 10030].indexOf(json.code), -1);
        });
    })

    it('学生报名', function () {
        return fetch(routes.enroll, Object.assign(header,
            // 为12号学生报名 
            { body: JSON.stringify({ session: session, id: 12 }) }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            assert.notEqual([0, 10022, 10023].indexOf(json.code), -1);
        });
    })

    it('同意安排', function () {
        return fetch(routes.agree, Object.assign(header,
            // 12号学生同意安排
            { body: JSON.stringify({ session: session, id: 12 }) }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            assert.notEqual([0, 10026, 10027].indexOf(json.code), -1);
        });
    })

    it('拒绝安排', function () {
        return fetch(routes.refuse, Object.assign(header,
            // 12号学生拒绝安排
            { body: JSON.stringify({ session: session, id: 12 }) }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            assert.notEqual([0, 10028, 10027].indexOf(json.code), -1);
        });
    })

    it('新建班级', function () {
        return fetch(routes.createClass, Object.assign(header,
            { body: JSON.stringify({ session: "XzZG17", clazz: { area: "北京", class_name: "高级", train_starttime: "2018/01/02" } }) }
        )).then(function (res) {
            return res.json();
            console.log("创建班级");
        }).then(function (json) {
            console.log(json);
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            assert.notEqual([0, 10026, 100261, 100262, 100263].indexOf(json.code), -1);
        });
    })

    it('编辑班级', function () {
        return fetch(routes.editClass, Object.assign(header,
            { body: JSON.stringify({ session: "XzZG17", id: 17, class: { class_head: "李san四", address: "中软大厦" } }) }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            console.log(json);
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            assert.notEqual([0, 10028, 100281].indexOf(json.code), -1);
        });
    })

    it('删除班级', function () {
        return fetch(routes.delClass, Object.assign(header,
            { body: JSON.stringify({ session: "XzZG17", id: 17 }) }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            console.log(json);
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            assert.notEqual([0, 10029, 100291].indexOf(json.code), -1);
        });
    })

    it('查看班级', function () {
        return fetch(routes.classinfos, Object.assign(header,
            { body: JSON.stringify({ session: "XzZG17" }) }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            console.log(json);
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            assert.notEqual([0, 10027, 100271].indexOf(json.code), -1);
        });
    })

    it('新建服务区', function () {
        return fetch(routes.createArea, Object.assign(header,
            { body: JSON.stringify({ session: "XzZG17", area: { area_name: "北京" } }) }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            console.log(json);
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            assert.notEqual([0,10032, 100321].indexOf(json.code), -1);
        });
    })
    it('查看服务区', function () {
        return fetch(routes.areaInfos , Object.assign(header,
            { body: JSON.stringify({ session: "XzZG17"}) }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            console.log(json);
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            assert.notEqual([0,10033, 100331].indexOf(json.code), -1);
        });
    })
    it('删除服务区', function () {
        return fetch(routes.delArea , Object.assign(header,
            { body: JSON.stringify({ session: "XzZG17", id: 17}) }
        )).then(function (res) {
            return res.json();
        }).then(function (json) {
            console.log(json);
            expect(json).to.be.an('object');
            expect(json.code).to.be.a('number');
            assert.notEqual([0,10034, 100341,100342].indexOf(json.code), -1);
        });
    })

    it('请求数据', function () {
        return fetch(routes.query, Object.assign(header, {
            body: JSON.stringify({ session: session })
        })).then(function (res) {
            return res.json();
        }).then(function (json) {
            // assert.equal(json.code, 10004)
            expect(json).to.be.an('object');
            // console.log(json)
            expect(json.code).to.be.a('number');
            expect(json.data.student).to.be.an('array');
            assert.notEqual([0, 10045].indexOf(json.code), -1);
        })
    })


});