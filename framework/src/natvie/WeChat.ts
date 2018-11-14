class WeChat {

	/**
	 * 获取微信CODE
	 */
	public static getCode(): void {
		NativeExternal.ins().callNative({ "id": "wxLogin" });
	}

	/**
	 * 分享图片
	 */
	public static shareImg(imgCode: string, title: string, description: string, isShare2Timeline: boolean): void {
		let data: any = {};
		data.id = "wxShareImg";
		let base64 = imgCode.split(',');
		data.imgCode = base64[1];
		data.title = title;
		data.description = description;
		data.isShare2Timeline = isShare2Timeline;
		NativeExternal.ins().callNative(data);
	}

	/**
	 * 分享链接
	 */
	public static shareUrl(imgCode: string, url: string, title: string, description: string, isShare2Timeline: boolean): void {
		let data: any = {};
		data.id = "wxShareUrl";
		let base64 = imgCode.split(',');
		data.imgCode = base64[1];
		data.url = url;
		data.title = title;
		data.description = description;
		data.isShare2Timeline = isShare2Timeline;
		NativeExternal.ins().callNative(data);
	}

    /**
     * 拉起微信支付
     * @param partnerId 微信支付分配的商户号
     * @param prepayId  微信返回的支付交易会话ID
     * @param nonceStr  随机字符串，不长于32位
     * @param timeStamp 时间戳
     * @param sign  签名
     */
	public static pay(partnerId: string, prepayId: string, nonceStr: string, timeStamp: string, sign: string) {
		let req: any = {};
		req.partnerId = partnerId;
		req.prepayId = prepayId;
		req.nonceStr = nonceStr;
		req.timeStamp = timeStamp;
		req.sign = sign;
		NativeExternal.ins().callNative(req);
	}
}