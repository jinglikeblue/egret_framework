class YaYaIMNotice extends Notice {
	public constructor(type: string, data: any = null) {
		super(type, data);
	}

	public static ON_RCD_UPLOAD: string = "YaYaIMNotice::ON_RCD_UPLOAD";
	public static ON_RCD_PLAY_STOP: string = "YaYaIMNotice::ON_RCD_PLAY_STOP";
	public static ON_LOGIN_RESULT: string = "YaYaIMNotice::ON_LOGIN_RESULT";
	public static ON_RCD_VOLUME: string = "YaYaIMNotice::ON_RCD_VOLUME";
	public static ON_RCD_COMPLETE: string = "YaYaIMNotice::ON_RCD_COMPLETE";
	public static ON_NET_STATE: string = "YaYaIMNotice::ON_NET_STATE";
}