var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var StageChangeSkin = (function (_super) {
            __extends(StageChangeSkin, _super);
            function StageChangeSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [360, 640]);
                this.elementsContent = [this.__3_i(), this.btnBack_i(), this.__4_i(), this.__5_i(), this.__6_i(), this.__7_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = StageChangeSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return StageChangeSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.__4_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["chuji_png", 23, 93.5]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["gaoji_png", 179, 93.5]);
                return t;
            };
            __egretProto__.__6_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["new_png", 334, 93.5]);
                return t;
            };
            __egretProto__.__7_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["zhongji_png", 490, 93.5]);
                return t;
            };
            __egretProto__.btnBack_i = function () {
                var t = new egret.gui.Button();
                this.btnBack = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("back_png", "back_png", "back_png"), 589, 13]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["backgroud_a_jpg", 0, 0]);
                return t;
            };
            StageChangeSkin._skinParts = ["btnBack"];
            return StageChangeSkin;
        })(egret.gui.Skin);
        scene.StageChangeSkin = StageChangeSkin;
        StageChangeSkin.prototype.__class__ = "skins.scene.StageChangeSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
//# sourceMappingURL=StageChangeSkin.js.map