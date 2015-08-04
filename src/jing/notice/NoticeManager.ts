class NoticeManager{
        //注册的通知
    private static _registeredNotice: any = {};
		
		/**
		 * 注册一个通知的监听（类似于事件机制,通过回调实现) 
		 * @param handleType 操作类型
		 * @param handler 回调方法
		 * 
		 */		
    public static addNoticeAction(type:string, action:Function):void{				
			if(null == NoticeManager._registeredNotice[type]){
				NoticeManager._registeredNotice[type] = [];
			}
			
			var actions:any = NoticeManager._registeredNotice[type];
			
			if(null != action && -1 == actions.indexOf(action)){
				actions.push(action);
			}
		}
		
		/**
		 * 注销一个操作监听 
		 * @param handleType 操作类型
		 * @param handler 回调方法
		 * 
		 */		
    public static removeNoticeAction(type:string, action:Function):void{
			if(null == NoticeManager._registeredNotice){
				return;
			}
			
			if(null == NoticeManager._registeredNotice[type]){
				return;
			}
			
            var actions: any = NoticeManager._registeredNotice[type];
			var actionIndex:number = actions.indexOf(action);
			
			if(-1 != actionIndex){
				actions.splice(actionIndex,1);
			}
		}
		
		/**
		 * 发送通知 
		 * @notice Action
		 */		
    public static sendNotice(notice:Notice):void{
			if(null == NoticeManager._registeredNotice){
				return;
			}
			
			if(null == NoticeManager._registeredNotice[notice.type]){
				return;
			}
			
			//和该事件关联的所有的方法
			var notices:any = NoticeManager._registeredNotice[notice.type];
			var noticeCount:number = notices.length;
			
//			try
//			{
				while(--noticeCount > -1){			
					if(noticeCount >= notices.length){
						continue;
					}
					notices[noticeCount](notice);
				}
//			}
//			catch(e:Error)
//			{
//				trace(e);
//			}
				
		}
}
