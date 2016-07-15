var paras = document.getElementById("example");
paras.onclick = function() {
    alert("Font color is " + paras.style.color);
    alert("Background color is " + paras.style.background);
    alert(paras.style.fontSize);
};
paras.style.color = "blue";

var that = document.getElementById("That");
that.onclick = function() {
    alert(typeof that.nodeName);
    alert(typeof that.style);
    alert("The color is " + that.style.color);
    alert("The font family is " + that.style.fontFamily);
    alert(typeof that.getAttribute("style"));
};



function styleHeaderSiblings(tag, theClass) {
    if (!document.getElementsByTagName) return false;
    var headers = document.getElementsByTagName(tag);
    var elem;
    for (var i = 0; i < headers.length; i ++) {
	elem = getNextElement(headers[i].nextSibling);
	addClass(elem, theClass);
    }
    
}

function getNextElement(node) {
    if (node.nodeType == 1) {
	return node;
    }
    if (node.nextSibling) {
	return getNextElement(node.nextSibling);
    }
    return null;
}

addLoadEvent(function() {
    styleHeaderSiblings("h1", "header-next");
});
