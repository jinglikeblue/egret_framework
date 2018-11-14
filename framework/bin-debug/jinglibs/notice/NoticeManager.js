var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var NoticeManager = (function () {
    function NoticeManager() {
    }
    /**
     * 注册一个通知的监听（类似于事件机制,通过回调实现)
     * @param handleType 操作类型
     * @param handler 回调方法
     *
     */
    NoticeManager.addNoticeAction = function (type, action, thisObj) {
        if (null == NoticeManager._registeredNotice[type]) {
            NoticeManager._registeredNotice[type] = [];
        }
        var actions = NoticeManager._registeredNotice[type];
        for (var _i = 0, actions_1 = actions; _i < actions_1.length; _i++) {
            var vo_1 = actions_1[_i];
            if (vo_1.action == action && vo_1.thisObj == thisObj) {
                //已注册过的事件
                egret.log("notice[" + type + "] has registered by " + thisObj + "." + action);
                return;
            }
        }
        var vo = new NoticeRegisteredVO();
        vo.action = action;
        vo.thisObj = thisObj;
        actions.push(vo);
    };
    /**
     * 注销一个操作监听
     * @param handleType 操作类型
     * @param handler 回调方法
     *
     */
    NoticeManager.removeNoticeAction = function (type, action, thisObj) {
        if (null == NoticeManager._registeredNotice) {
            return;
        }
        if (null == NoticeManager._registeredNotice[type]) {
            return;
        }
        var actions = NoticeManager._registeredNotice[type];
        var size = actions.length;
        while (--size > -1) {
            var vo = actions[size];
            if (vo.action == action && vo.thisObj == thisObj) {
                //已注册过的事件
                actions.splice(size, 1);
                return;
            }
        }
    };
    /**
     * 发送通知
     * @notice Action
     */
    NoticeManager.sendNotice = function (notice) {
        if (null == NoticeManager._registeredNotice) {
            return;
        }
        if (null == NoticeManager._registeredNotice[notice.type]) {
            return;
        }
        //和该事件关联的所有的方法
        var actions = NoticeManager._registeredNotice[notice.type];
        var actionsCount = actions.length;
        var noticedRecord = [];
        while (--actionsCount > -1) {
            if (actionsCount >= actions.length) {
                continue;
            }
            var vo = actions[actionsCount];
            if (noticedRecord.indexOf(vo) == -1) {
                vo.action.call(vo.thisObj, notice);
                noticedRecord.push(vo);
            }
        }
    };
    /**
     * 发送一个快速通知，发送出去的是Notice对象
     */
    NoticeManager.sendNoticeQuick = function (noticeType, data) {
        if (data === void 0) { data = null; }
        NoticeManager.sendNotice(new Notice(noticeType, data));
    };
    //注册的通知
    NoticeManager._registeredNotice = {};
    return NoticeManager;
}());
__reflect(NoticeManager.prototype, "NoticeManager");
//# sourceMappingURL=NoticeManager.js.map