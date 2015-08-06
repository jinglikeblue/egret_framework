var skins;
(function (skins) {
    var window;
    (function (window) {
        var LoadingSkin = (function (_super) {
            __extends(LoadingSkin, _super);
            function LoadingSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [360, 640]);
                this.elementsContent = [this.__3_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = LoadingSkin.prototype;
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["img_loading_jpg", 0, 0]);
                return t;
            };
            return LoadingSkin;
        })(egret.gui.Skin);
        window.LoadingSkin = LoadingSkin;
        LoadingSkin.prototype.__class__ = "skins.window.LoadingSkin";
    })(window = skins.window || (skins.window = {}));
})(skins || (skins = {}));
//# sourceMappingURL=LoadingSkin.js.map