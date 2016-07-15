function displayAccesskeys() {
    if (!document.getElementsByTagName) return false;
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    // 获取所有的a
    var links = document.getElementsByTagName("a");
    var akeys = new Array();
    for (var i = 0; i < links.length; i ++) {
	var currentkey = links[i];
	if (!currentkey.getAttribute("accesskey")) continue;
	var key = currentkey.getAttribute("accesskey");
	var linkText = currentkey.childNodes[0].nodeValue;
	akeys[key] = linkText;
    }
    var list = document.createElement("ul");
    for (key in akeys) {
	var text = akeys[key];
	var str = key + ": " + text;
	var item = document.createElement("li");
	var textItem = document.createTextNode(str);
	item.appendChild(textItem);
	list.appendChild(item);
    }

    var header = document.createElement("h3");
    var headerText = document.createTextNode("Assesskeys");
    header.appendChild(headerText);
    document.body.appendChild(header);
    document.body.appendChild(list);
    return true;
}


addLoadEvent(displayAccesskeys);
