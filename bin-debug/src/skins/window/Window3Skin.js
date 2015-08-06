var skins;
(function (skins) {
    var window;
    (function (window) {
        var Window3Skin = (function (_super) {
            __extends(Window3Skin, _super);
            function Window3Skin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [135, 150]);
                this.elementsContent = [this.bg_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = Window3Skin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return Window3Skin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.bg_i = function () {
                var t = new egret.gui.UIAsset();
                this.bg = t;
                this.__s(t, ["source", "y"], ["dshi_png", 0]);
                return t;
            };
            Window3Skin._skinParts = ["bg"];
            return Window3Skin;
        })(egret.gui.Skin);
        window.Window3Skin = Window3Skin;
        Window3Skin.prototype.__class__ = "skins.window.Window3Skin";
    })(window = skins.window || (skins.window = {}));
})(skins || (skins = {}));
//# sourceMappingURL=Window3Skin.js.map