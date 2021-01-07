function getVerifyCode() {
    let phone = document.querySelector("#phone").value;
    if(phone) {
        fetch(`http://app.zhidiantianxia.cn/api/common/sendVerifyCodeCheck?phone=${phone}&type=4`,{
            method:"POST",
            mode: 'cors'
        }).then((res) => {
            res.text().then((data) => {
                console.log(data);
            });
        });
    }
    else {
        alert("please input phone num");
    }
}

function getAxyToken() {
    let verifyCode = document.querySelector("#verifyCode").value;

    if(verifyCode) {
        fetch(`http://app.zhidiantianxia.cn/api/Login/phone?phone=${phone}&code=${verifyCode}&mobileSystem=9&appVersion=1.6.1&mobileVersion=Nokia9&deviceToken=${deviceToken}&pushToken=${phone}`,{
            method:"POST",
            mode: 'cors'
        }).then((res) => {
            res.text().then((data) => {
                console.log(data);
            });
        });
    }
    else{
        alert("please input verifyCode");
    }
}

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    }).replaceAll("-","").substring(0,19);
}