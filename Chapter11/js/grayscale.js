function convertTOGS(img) {
    if(!Modernizr.canvas) {
	console.log("not support canvas");
	return;
    }
    // 存储原色彩版
    img.color = img.getAttribute("src");
    img.grayscale = createGSCanvas(img);

    img.onmouseover = function() {
	this.src = this.color;
    };

    img.onmouseout = function() {
	this.src = this.grayscale;
    };
    img.onmouseout();
}


function createGSCanvas(img) {
    var canvas = document.createElement("canvas");
    canvas.setAttribute("width", img.width);
    canvas.setAttribute("height", img.height);
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var c = ctx.getImageData(0, 0, img.width, img.height);
    for (var i = 0; i < c.height; i++) {
	for (var j = 0; j < c.width; j++) {
	    var x = (i * 4) * c.width + (j * 4);
	    var r = c.data[x];
	    var g = c.data[x+1];
	    var b = c.data[x+2];
	    c.data[x] = c.data[x+1] = c.data[x+2] = (r+g+b) / 3;
	}
    }
    ctx.putImageData(c, 0, 0, 0, 0, c.width, c.height);
    return canvas.toDataURL();
}

window.onload = function() {
    convertTOGS(document.getElementById('avatar'));
};
