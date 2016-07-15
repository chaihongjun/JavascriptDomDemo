function showPic(whichpic) {
    if (!document.getElementById("placeholder")) return false;
    var source = whichpic.href;
    var placeholder = document.getElementById("placeholder");
    if (placeholder.nodeName != "IMG") return false;
    placeholder.src = source;
    if (document.getElementById("description")) {
	var title = whichpic.title ? whichpic.title : "";
	var description = document.getElementById("description");
	if (description.firstChild.nodeType == 3) {
	    description.firstChild.nodeValue = title;
	};
    };
    return true;
};

window.onload = function() {
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById("picture-lib")) return false;
    var pictureLib = document.getElementById("picture-lib");
    var showPicElement = pictureLib.getElementsByTagName("a");
    for (var i = 0; i < showPicElement.length; i++) {
	var temp = showPicElement[i];
	showPicElement[i].onclick = function() {
	    return !showPic(this);
	};
    }
};
