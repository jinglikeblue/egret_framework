function registerWX(info) {
    info.debug = false;
    wx.ready(this.onWXReady);
    wx.error(this.onWXError);
    wx.config(info);
}

function onWXReady() {
    Extension.onCall("onWXReady");
}

function onWXError() {
    Extension.onCall("onWXError");
}

function initShareMsg(iconUrl, linkUrl, title, desc) {
    var obj = {};
    obj.title = title;
    obj.desc = desc;
    obj.link = linkUrl;
    obj.imgUrl = iconUrl;
    obj.success = this.onWXShareSuccess;
    obj.cancel = this.onWXShareCancel;

    //分享到朋友圈
    wx.onMenuShareTimeline(obj);
    //分享给朋友
    wx.onMenuShareAppMessage(obj);
    //分享到qq
    wx.onMenuShareTimeline(obj);
    //分享到腾讯微博
    wx.onMenuShareWeibo(obj);
    //分享到qq空间
    wx.onMenuShareQZone(obj);
}

function onWXShareSuccess() {
    Extension.onCall("onWXShareSuccess");
}

function onWXShareCancel() {
    Extension.onCall("onWXShareCancel");
}

function testCall(a, b) {
    Extension.onCall("testCall", a, b);
}

function chooseWXPay(timestamp, nonceStr, package, signType, paySign) {
    wx.chooseWXPay({
        timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
        package: package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: paySign, // 支付签名
        success: function (res) {
            Extension.onCall("onChooseWXPaySuccess", res);
        }
    });
}