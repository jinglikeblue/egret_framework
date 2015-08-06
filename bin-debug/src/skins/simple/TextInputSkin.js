var skins;
(function (skins) {
    var simple;
    (function (simple) {
        var TextInputSkin = (function (_super) {
            __extends(TextInputSkin, _super);
            function TextInputSkin() {
                _super.call(this);
                this.__s = egret.gui.setProperties;
                this.__s(this, ["minHeight", "minWidth"], [30, 100]);
                this.elementsContent = [this.__5_i(), this.textDisplay_i()];
                this.promptDisplay_i();
                this.states = [
                    new egret.gui.State("normal", []),
                    new egret.gui.State("disabled", [
                        new egret.gui.SetProperty("textDisplay", "textColor", 0xAAAAAA)
                    ]),
                    new egret.gui.State("normalWithPrompt", [
                        new egret.gui.AddItems("promptDisplay", "", "last", "")
                    ]),
                    new egret.gui.State("disabledWithPrompt", [
                        new egret.gui.AddItems("promptDisplay", "", "last", "")
                    ])
                ];
            }
            var __egretProto__ = TextInputSkin.prototype;
            Object.defineProperty(__egretProto__, "skinParts", {
                get: function () {
                    return TextInputSkin._skinParts;
                },
                enumerable: true,
                configurable: true
            });
            __egretProto__.promptDisplay_i = function () {
                var t = new egret.gui.Label();
                this.promptDisplay = t;
                this.__s(t, ["left", "maxDisplayedLines", "size", "textColor", "touchChildren", "touchEnabled", "verticalCenter"], [10, 1, 20, 0xa9a9a9, false, false, 0]);
                return t;
            };
            __egretProto__.__5_i = function () {
                var t = new egret.gui.UIAsset();
                this.__s(t, ["percentHeight", "source", "percentWidth"], [100, "textbox_png", 100]);
                return t;
            };
            __egretProto__.textDisplay_i = function () {
                var t = new egret.gui.EditableText();
                this.textDisplay = t;
                this.__s(t, ["bottom", "percentHeight", "left", "right", "size", "textColor", "top", "percentWidth"], [8, 100, 10, 10, 20, 0x000000, 8, 100]);
                return t;
            };
            TextInputSkin._skinParts = ["textDisplay", "promptDisplay"];
            return TextInputSkin;
        })(egret.gui.Skin);
        simple.TextInputSkin = TextInputSkin;
        TextInputSkin.prototype.__class__ = "skins.simple.TextInputSkin";
    })(simple = skins.simple || (skins.simple = {}));
})(skins || (skins = {}));
//# sourceMappingURL=TextInputSkin.js.map