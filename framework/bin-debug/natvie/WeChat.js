var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WeChat = (function () {
    function WeChat() {
    }
    /**
     * 获取微信CODE
     */
    WeChat.getCode = function () {
        NativeExternal.ins().callNative({ "id": "wxLogin" });
    };
    /**
     * 分享图片
     */
    WeChat.shareImg = function (imgCode, title, description, isShare2Timeline) {
        var data = {};
        data.id = "wxShareImg";
        var base64 = imgCode.split(',');
        data.imgCode = base64[1];
        data.title = title;
        data.description = description;
        data.isShare2Timeline = isShare2Timeline;
        NativeExternal.ins().callNative(data);
    };
    /**
     * 分享链接
     */
    WeChat.shareUrl = function (imgCode, url, title, description, isShare2Timeline) {
        var data = {};
        data.id = "wxShareUrl";
        var base64 = imgCode.split(',');
        data.imgCode = base64[1];
        data.url = url;
        data.title = title;
        data.description = description;
        data.isShare2Timeline = isShare2Timeline;
        NativeExternal.ins().callNative(data);
    };
    /**
     * 拉起微信支付
     * @param partnerId 微信支付分配的商户号
     * @param prepayId  微信返回的支付交易会话ID
     * @param nonceStr  随机字符串，不长于32位
     * @param timeStamp 时间戳
     * @param sign  签名
     */
    WeChat.pay = function (partnerId, prepayId, nonceStr, timeStamp, sign) {
        var req = {};
        req.partnerId = partnerId;
        req.prepayId = prepayId;
        req.nonceStr = nonceStr;
        req.timeStamp = timeStamp;
        req.sign = sign;
        NativeExternal.ins().callNative(req);
    };
    return WeChat;
}());
__reflect(WeChat.prototype, "WeChat");
//# sourceMappingURL=WeChat.js.map