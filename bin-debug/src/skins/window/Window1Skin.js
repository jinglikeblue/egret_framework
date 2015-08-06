var skins;
(function (skins) {
    var window;
    (function (window) {
        var Window1Skin = (function (_super) {
            __extends(Window1Skin, _super);
            function Window1Skin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [135, 150]);
                this.elementsContent = [this.bg_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = Window1Skin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return Window1Skin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.bg_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg = t;
                this.__s(t, ["source", "x", "y"], ["dershi_png", 0, 0]);
                return t;
            };
            Window1Skin._skinParts = ["bg"];
            return Window1Skin;
        })(egret.gui.Skin);
        window.Window1Skin = Window1Skin;
        Window1Skin.prototype.__class__ = "skins.window.Window1Skin";
    })(window = skins.window || (skins.window = {}));
})(skins || (skins = {}));
//# sourceMappingURL=Window1Skin.js.map