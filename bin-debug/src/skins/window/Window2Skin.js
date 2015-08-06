var skins;
(function (skins) {
    var window;
    (function (window) {
        var Window2Skin = (function (_super) {
            __extends(Window2Skin, _super);
            function Window2Skin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [135, 150]);
                this.elementsContent = [this.bg_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = Window2Skin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return Window2Skin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.bg_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg = t;
                this.__s(t, ["source", "x", "y"], ["dsanshi_png", 0, 0]);
                return t;
            };
            Window2Skin._skinParts = ["bg"];
            return Window2Skin;
        })(egret.gui.Skin);
        window.Window2Skin = Window2Skin;
        Window2Skin.prototype.__class__ = "skins.window.Window2Skin";
    })(window = skins.window || (skins.window = {}));
})(skins || (skins = {}));
//# sourceMappingURL=Window2Skin.js.map