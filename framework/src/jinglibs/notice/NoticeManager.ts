class NoticeManager {
	//注册的通知
	private static _registeredNotice: any = {};

	/**
	 * 注册一个通知的监听（类似于事件机制,通过回调实现) 
	 * @param handleType 操作类型
	 * @param handler 回调方法
	 * 
	 */
	public static addNoticeAction(type: string, action: Function, thisObj: any): void {
		if (null == NoticeManager._registeredNotice[type]) {
			NoticeManager._registeredNotice[type] = [];
		}

		let actions = NoticeManager._registeredNotice[type] as NoticeRegisteredVO[];

		for (let vo of actions) {
			if (vo.action == action && vo.thisObj == thisObj) {
				//已注册过的事件
				egret.log(`notice[${type}] has registered by ${thisObj}.${action}`);
				return;
			}
		}

		let vo = new NoticeRegisteredVO();
		vo.action = action;
		vo.thisObj = thisObj;
		actions.push(vo);
	}

	/**
	 * 注销一个操作监听 
	 * @param handleType 操作类型
	 * @param handler 回调方法
	 * 
	 */
	public static removeNoticeAction(type: string, action: Function, thisObj: any): void {
		if (null == NoticeManager._registeredNotice) {
			return;
		}

		if (null == NoticeManager._registeredNotice[type]) {
			return;
		}

		let actions = NoticeManager._registeredNotice[type] as NoticeRegisteredVO[];
		let size = actions.length;
		while (--size > -1) {
			let vo = actions[size];
			if (vo.action == action && vo.thisObj == thisObj) {
				//已注册过的事件
				actions.splice(size, 1);
				return;
			}
		}
	}

	/**
	 * 发送通知 
	 * @notice Action
	 */
	public static sendNotice(notice: Notice): void {
		if (null == NoticeManager._registeredNotice) {
			return;
		}

		if (null == NoticeManager._registeredNotice[notice.type]) {
			return;
		}

		//和该事件关联的所有的方法
		let actions = NoticeManager._registeredNotice[notice.type] as NoticeRegisteredVO[];
		let actionsCount = actions.length;
		let noticedRecord: NoticeRegisteredVO[] = [];
		while (--actionsCount > -1) {
			if (actionsCount >= actions.length) {
				continue;
			}
			let vo = actions[actionsCount];
			if (noticedRecord.indexOf(vo) == -1) {
				vo.action.call(vo.thisObj, notice);
				noticedRecord.push(vo);
			}
		}
	}

	/**
	 * 发送一个快速通知，发送出去的是Notice对象
	 */
	public static sendNoticeQuick(noticeType: string, data: any = null): void {
		NoticeManager.sendNotice(new Notice(noticeType, data));
	}
}
