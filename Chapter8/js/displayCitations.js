function displayCitations() {
    if (!document.getElementsByTagName) return false;
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;

    var quotes = document.getElementsByTagName("blockquote");
    for (var i = 0; i < quotes.length; i ++) {
	var currentCite = quotes[i];
	if (!currentCite.getAttribute("cite")) continue;
	var url = currentCite.getAttribute("cite");

	// 获取所有的元素节点。因为有时候根据lastChild来获取最后一个节点的话有些浏览器会把换行符当成是一个文本节点
	var quoteChildren = quotes[i].getElementsByTagName("*");
	if (quoteChildren.length < 1) continue;
	var elem = quoteChildren[quoteChildren.length - 1];
	var link = document.createElement("a");
	var linkText = document.createTextNode("source");
	link.appendChild(linkText);
	link.setAttribute("href", url);
	var superscript = document.createElement("sup");
	superscript.appendChild(link);
	elem.appendChild(superscript);
    }
    return true;
}

addLoadEvent(displayCitations);


