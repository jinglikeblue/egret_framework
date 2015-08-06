var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Showcase = (function (_super) {
    __extends(Showcase, _super);
    function Showcase() {
        _super.call(this);
        this.dataSource = [];
        this.skinName = "skins.scene.ShowcaseSkin";
        this.initListData();
    }
    Showcase.prototype.initListData = function () {
        for (var i = 1; i < 50; i++) {
            this.dataSource.push({ label: "List Item " + i });
        }
    };
    Showcase.prototype.childrenCreated = function () {
        this.btnShowMessage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this.list.addEventListener(egret.gui.IndexChangeEvent.CHANGE, this.onListSelectionChange, this);
    };
    Showcase.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.list) {
            this.list.height = this.stage.stageHeight - 300;
            this.list.dataProvider = new egret.gui.ArrayCollection(this.dataSource);
        }
    };
    Showcase.prototype.onButtonClick = function (event) {
        var selection = this.list.selectedItem ? this.list.selectedItem.label : "nothing";
        egret.gui.Alert.show("You have selected " + selection, "Title");
    };
    Showcase.prototype.onListSelectionChange = function (event) {
        console.log("You have selected " + this.list.selectedItem.label);
    };
    return Showcase;
})(egret.gui.SkinnableComponent);
