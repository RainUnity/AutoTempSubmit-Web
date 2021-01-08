let phone = "";
let config = [
    {
        "axy-phone": "",
        "axy-token": ""
    },
    {
        "health":0,
        "student":"1",
        "content":{
            "location":{
                //学校地址
                "address":"",
                "code":"1",
                //纬度
                "lng":113.598399,
                //经度
                "lat":34.862548
            },
            //姓名
            "name":"",
            //手机号
            "phone":"",
            "credentialType":"身份证",
            //身份证号码
            "credentialCode":"",
            //学院 eg. 信息工程学院
            "college":"",
            //专业 eg. 软件工程
            "major":"",
            //班级 eg. 软工6班
            "className":"",
            //学号
            "code":"",
            //当前地址 eg. 河南省-郑州市-惠济区
            "nowLocation":"",
            "temperature":"36.6",
            "observation":"否",
            "confirmed":"否",
            "goToHuiBei":"否",
            "contactIllPerson":"否",
            "isFamilyStatus":"否",
            "health":0
        }
    }
];

function getVerifyCode() {
    phone = document.querySelector("#phone").value;
    if(phone) {
        fetch(`http://app.zhidiantianxia.cn/api/common/sendVerifyCodeCheck?phone=${phone}&type=4`,{
            method:"POST",
            mode: 'cors'
        }).then((res) => {
            res.text().then((data) => {
                if(JSON.parse(data).status == 1){
                    alert("验证码发送成功");
                }
                else{
                    alert("验证码发送失败");
                }
            });
        });
    }
    else {
        alert("请输入手机号");
    }
}

function getAxyToken() {
    let verifyCode = document.querySelector("#verifyCode").value;
    let deviceToken = getDeviceToken();

    if(verifyCode && deviceToken && phone) {
        fetch(`http://app.zhidiantianxia.cn/api/Login/phone?phone=${phone}&code=${verifyCode}&mobileSystem=9&appVersion=1.6.1&mobileVersion=Nokia9&deviceToken=${deviceToken}&pushToken=${phone}`,{
            method:"POST",
            mode: 'cors'
        }).then((res) => {
            res.text().then((data) => {
                let axyToken = JSON.parse(data).data;
                if(axyToken){
                    document.querySelector("#axy-phone").value = phone;
                    document.querySelector("#axy-token").value = axyToken;
                }
                else{
                    alert("获取 axy-token 失败");
                }
            });
        });
    }
    else{
        alert("请完善信息");
    }
}

function getDeviceToken() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    }).replaceAll("-","").substring(0,19);
}

function getLocation() {
    navigator.geolocation.getCurrentPosition((position)=>{
        document.querySelector("#lng").value = position.coords.longitude;
        document.querySelector("#lat").value = position.coords.latitude;
    });
}

function verifyInfo() {
    let flag = true;
    document.querySelectorAll(".require").forEach(element => {
        if(!element.value){
            flag = false;
        }
    });
    return flag;
}

function generateInfo() {
    if(!verifyInfo()) {
        alert("信息不完整");
        return;
    }

    //=========保存信息
    config[0]["axy-phone"] = document.querySelector("#axy-phone").value;
    config[0]["axy-token"] = document.querySelector("#axy-token").value;

    config[1].content.location.address = document.querySelector("#address").value;
    config[1].content.location.lng = document.querySelector("#lng").value;
    config[1].content.location.lat = document.querySelector("#lat").value;
    config[1].content.name = document.querySelector("#name").value;
    config[1].content.phone = document.querySelector("#axy-phone").value;
    config[1].content.credentialCode = document.querySelector("#credentialCode").value;
    config[1].content.college = document.querySelector("#college").value;
    config[1].content.major = document.querySelector("#major").value;
    config[1].content.className = document.querySelector("#className").value;
    config[1].content.code = document.querySelector("#code").value;
    config[1].content.nowLocation = document.querySelector("#nowLocation").value;
    config[1].content.temperature = document.querySelector("#temperature").value;

    if(confirm("确认信息无误？")){
        saveInfo();
    }
}

function saveInfo(){
    fetch("https://storage.conchbrain.workers.dev/autoTempSubmit/set",{
        method:"POST",
        mode:"no-cors",
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({
            "key": document.querySelector("#axy-phone").value,
            "value": config
        })
    }).then((res)=>{
        res.text().then((data)=>{
            alert(data);
        });
    });
}

getLocation();


// 跨域测试脚本
// fetch("https://storage.conchbrain.workers.dev/autoTempSubmit/set",{
//     method:"POST",
//     mode:"no-cors",
//     headers: {
//         'content-type': 'application/json',
//     },
//     body: JSON.stringify({
//         "key": "hello",
//         "value": "world"
//     })
// }).then((res)=>{
//     res.text().then((data)=>{
//         alert(data);
//     });
// });