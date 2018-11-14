var mime = { 'png': 'image/png', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg' };
var selectedHandler;
var thisRef;
function selectImage(selectedFunc, thisValue) {
    selectedHandler = selectedFunc;
    thisRef = thisValue;
    var fileInput = document.getElementById("fileInput");
    if (fileInput == null) {
        fileInput = document.createElement("input");
        fileInput.id = "fileInput";
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.style.height = "0px";
        fileInput.style.display = "block";
        fileInput.style.overflow = "hidden";
        document.body.insertBefore(fileInput, document.body.firstChild);
        fileInput.addEventListener('change', onSelectImageFail, false);
    }
    fileInput.click();
}
function onSelectImageFail(evt) {
    var file = evt.target.files[0];
    var reader = new FileReader();
    function tmpLoad() {
        selectedHandler && selectedHandler.call(thisRef, this.result);
    }
    reader.onload = tmpLoad;
    reader.readAsDataURL(file);
}

/*
用法
		window["selectImage"](this.onSelectImg, this);

        private onSelectImg(base64: string): void {
            let code = base64.split(',')[1];
            let bmd = egret.BitmapData.create("base64", code);
            let img = new egret.Bitmap(bmd);
            this.addChild(img);
        }
*/

