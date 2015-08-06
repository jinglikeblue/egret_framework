var skins;
(function (skins) {
    var scene;
    (function (scene) {
        var HallSkin = (function (_super) {
            __extends(HallSkin, _super);
            function HallSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["height", "width"], [360, 640]);
                this.elementsContent = [this.__3_i(), this.btnStart_i(), this.btn_i(), this.btnR_i(), this.btnAdd_i(), this.btnReduce_i()];
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [])
                ];
            }
            var __egretProto__ = HallSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return HallSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.btnAdd_i = function () {
                var t = new egret.gui.Button();
                this.btnAdd = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("btn_gift_z_png", "btn_gift_a_png"), 507, 12]);
                return t;
            };
            __egretProto__.btnR_i = function () {
                var t = new egret.gui.Button();
                this.btnR = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("btn_normal_a_png", "btn_normal_a_png"), 340, 171]);
                return t;
            };
            __egretProto__.btnReduce_i = function () {
                var t = new egret.gui.Button();
                this.btnReduce = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("btn_exchange_z_png", "btn_exchange_a_png"), 569, 12]);
                return t;
            };
            __egretProto__.btnStart_i = function () {
                var t = new egret.gui.Button();
                this.btnStart = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("btn_start_a_png", "btn_start_a_png", "btn_start_a_png"), 340, 79]);
                return t;
            };
            __egretProto__.btn_i = function () {
                var t = new egret.gui.Button();
                this.btn = t;
                this.__s(t, ["skinName", "x", "y"], [new egret.gui.ButtonSkin("btn_personal_a_png", "btn_personal_a_png", "btn_personal_a_png"), 340, 262]);
                return t;
            };
            __egretProto__.__3_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["source", "x", "y"], ["img_bg_hall_jpg", 0, 0]);
                return t;
            };
            HallSkin._skinParts = ["btnStart", "btn", "btnR", "btnAdd", "btnReduce"];
            return HallSkin;
        })(egret.gui.Skin);
        scene.HallSkin = HallSkin;
        HallSkin.prototype.__class__ = "skins.scene.HallSkin";
    })(scene = skins.scene || (skins.scene = {}));
})(skins || (skins = {}));
//# sourceMappingURL=HallSkin.js.map