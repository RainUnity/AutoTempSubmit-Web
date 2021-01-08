let phone = "";

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

function verifyInfo() {
    
}

function saveInfo() {
    if(!verifyInfo()) {
        alert("信息不完整");
        return;
    }

    //=========保存信息

}