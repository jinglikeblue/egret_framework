class WindowLoadingVO {
	//打开窗口的名称
	public winName: string;
	//传递到打开窗口的数据。默认为null
	public data: any;
	//是否在窗口下显示遮罩。该值只确定是否在窗口下可视的显示遮罩。并不影响触摸事件的向下传递。默认为true
	public blur: boolean = true;
	//是否在打开窗口同时关闭其它所有已打开的窗口。默认为false
	public closeOther: boolean = false;
	//依赖的资源组
	public groups: string[];
}