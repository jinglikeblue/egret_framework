var skins;
(function (skins) {
    var window;
    (function (window) {
        var WindLoadingSkin = (function (_super) {
            __extends(WindLoadingSkin, _super);
            function WindLoadingSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [200, 300]);
                this.elementsContent = [this.__3_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = WindLoadingSkin.prototype;
            __egretProto__.__3_i = function () {
                var t = new egret.gui.Rect();
                this.__s(t, ["fillColor", "percentHeight", "percentWidth", "x", "y"], [0xB1DF56, 100, 100, 0, 0]);
                return t;
            };
            return WindLoadingSkin;
        })(egret.gui.Skin);
        window.WindLoadingSkin = WindLoadingSkin;
        WindLoadingSkin.prototype.__class__ = "skins.window.WindLoadingSkin";
    })(window = skins.window || (skins.window = {}));
})(skins || (skins = {}));
//# sourceMappingURL=WindLoadingSkin.js.map