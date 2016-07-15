// 添加事件到window.onload
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
	window.onload = func;
    } else {
	window.onload = function() {
	    oldonload();
	    func();
	};
    }
}

// 元素插入到某个元素后面
function insertAfter(newElement, targetElement) {
    // 获得父节点
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
	parent.appendChild(newElement);
    } else {
	parent.insertBefore(newElement, targetElement.nextSibling);
    }
};


// 在js创建需要显示图片的节点, 以及对应描述的节点
function preparePlaceholder() {
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("picture-lib")) return false;
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "image/loading.gif");
    placeholder.setAttribute("alt", "my image gallery");
    var description = document.createElement("p");
    description.setAttribute("id", "description");
    var text = document.createTextNode("Choose an images");
    description.appendChild(text);
    var pictureLib = document.getElementById("picture-lib");
    insertAfter(placeholder, pictureLib);
    insertAfter(description, placeholder);
};

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

function prepareGallery() {
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
    return null;
};


addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
