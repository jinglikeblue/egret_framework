
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"promise/promise.js",
	"bin-debug/jinglibs/notice/Notice.js",
	"bin-debug/models/vos/StartParamsVO.js",
	"bin-debug/jinglibs/qr/QRUtil.js",
	"bin-debug/consts/AudioName.js",
	"bin-debug/consts/ClientType.js",
	"bin-debug/consts/SceneName.js",
	"bin-debug/consts/WindowName.js",
	"bin-debug/consts/enums/protos/EC2S.js",
	"bin-debug/consts/enums/protos/ES2C.js",
	"bin-debug/events/GameSocketEvent.js",
	"bin-debug/extensions/Extension.js",
	"bin-debug/extensions/WXJsSdk.js",
	"bin-debug/jinglibs/audio/AudioDevice.js",
	"bin-debug/jinglibs/control/ACommand.js",
	"bin-debug/jinglibs/history/HistoryRecord.js",
	"bin-debug/jinglibs/history/HistoryRecordEvent.js",
	"bin-debug/jinglibs/loader/AsyncRES.js",
	"bin-debug/jinglibs/loader/GroupListLoader.js",
	"bin-debug/jinglibs/loader/GroupListLoaderEvent.js",
	"bin-debug/jinglibs/loader/GroupListSingleThreadLoader.js",
	"bin-debug/jinglibs/loader/ResItemListLoader.js",
	"bin-debug/jinglibs/model/CallbackModel.js",
	"bin-debug/jinglibs/model/CountDownModel.js",
	"bin-debug/jinglibs/net/AProtocolCacher.js",
	"bin-debug/Main.js",
	"bin-debug/jinglibs/notice/NoticeManager.js",
	"bin-debug/jinglibs/notice/NoticeRegisteredVO.js",
	"bin-debug/jinglibs/qr/QR8bitByte.js",
	"bin-debug/jinglibs/qr/QRBitBuffer.js",
	"bin-debug/jinglibs/qr/QRCode.js",
	"bin-debug/jinglibs/qr/QRCodeModel.js",
	"bin-debug/jinglibs/qr/QRErrorCorrectLevel.js",
	"bin-debug/jinglibs/qr/QRMaskPattern.js",
	"bin-debug/jinglibs/qr/QRMath.js",
	"bin-debug/jinglibs/qr/QRMode.js",
	"bin-debug/jinglibs/qr/QRPolynomial.js",
	"bin-debug/jinglibs/qr/QRRSBlock.js",
	"bin-debug/views/windows/DemoWin.js",
	"bin-debug/jinglibs/time/DelayCaller.js",
	"bin-debug/jinglibs/time/DelayCallerParamVO.js",
	"bin-debug/jinglibs/ui/AMediator.js",
	"bin-debug/jinglibs/ui/IView.js",
	"bin-debug/jinglibs/ui/SceneMgr.js",
	"bin-debug/jinglibs/ui/WindowMgr.js",
	"bin-debug/jinglibs/utils/CSVParser.js",
	"bin-debug/jinglibs/utils/RectUtil.js",
	"bin-debug/jinglibs/utils/TextUtil.js",
	"bin-debug/jinglibs/utils/TimeUtil.js",
	"bin-debug/models/DC.js",
	"bin-debug/models/vos/MsgWinVO.js",
	"bin-debug/models/vos/SettingVO.js",
	"bin-debug/adapters/ThemeAdapter.js",
	"bin-debug/natvie/NativeCaller.js",
	"bin-debug/natvie/NativeExternal.js",
	"bin-debug/natvie/WeChat.js",
	"bin-debug/natvie/YaYaIM.js",
	"bin-debug/net/GameSocket.js",
	"bin-debug/notices/GameNotice.js",
	"bin-debug/notices/NativeNotice.js",
	"bin-debug/notices/YaYaIMNotice.js",
	"bin-debug/ui/GSceneMgr.js",
	"bin-debug/ui/GWindowMgr.js",
	"bin-debug/ui/SceneLoadingVO.js",
	"bin-debug/ui/WindowLoadingVO.js",
	"bin-debug/utils/DateUtil.js",
	"bin-debug/utils/DeviceUtil.js",
	"bin-debug/utils/StorageUtil.js",
	"bin-debug/views/base/LoadScene.js",
	"bin-debug/views/base/LoadWin.js",
	"bin-debug/views/base/MsgWin.js",
	"bin-debug/views/base/Preloading.js",
	"bin-debug/views/base/WaitWin.js",
	"bin-debug/views/scenes/DemoScene.js",
	"bin-debug/views/windows/DemoWebSocket.js",
	"bin-debug/adapters/AssetAdapter.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 1280,
		contentHeight: 720,
		showPaintRect: false,
		showFPS: true,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};