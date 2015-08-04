var NoticeManager = (function () {
    function NoticeManager() {
    }
    NoticeManager.addNoticeAction = function (type, action) {
        if (null == NoticeManager._registeredNotice[type]) {
            NoticeManager._registeredNotice[type] = [];
        }
        var actions = NoticeManager._registeredNotice[type];
        if (null != action && -1 == actions.indexOf(action)) {
            actions.push(action);
        }
    };
    NoticeManager.removeNoticeAction = function (type, action) {
        if (null == NoticeManager._registeredNotice) {
            return;
        }
        if (null == NoticeManager._registeredNotice[type]) {
            return;
        }
        var actions = NoticeManager._registeredNotice[type];
        var actionIndex = actions.indexOf(action);
        if (-1 != actionIndex) {
            actions.splice(actionIndex, 1);
        }
    };
    NoticeManager.sendNotice = function (notice) {
        if (null == NoticeManager._registeredNotice) {
            return;
        }
        if (null == NoticeManager._registeredNotice[notice.type]) {
            return;
        }
        var notices = NoticeManager._registeredNotice[notice.type];
        var noticeCount = notices.length;
        while (--noticeCount > -1) {
            if (noticeCount >= notices.length) {
                continue;
            }
            notices[noticeCount](notice);
        }
    };
    NoticeManager._registeredNotice = {};
    return NoticeManager;
})();
