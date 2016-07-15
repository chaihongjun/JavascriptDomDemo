function displayAbbreviations() {
    // 创建dl标签
    if (!document.getElementsByTagName) return false;
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    var dlElement = document.createElement("dl");
    var allAbbr = document.getElementsByTagName("abbr");
    // 检测是否有abbr标签。为了与一些页面兼容
    if (allAbbr.length < 1) return false;
    for (var i = 0; i < allAbbr.length; i++) {
	var current_abbr = allAbbr[i];
	// 在IE跑不会报错
	if (current_abbr.childNodes.length < 1) continue;
	var dtElement = document.createElement("dt");
	var ddElement = document.createElement("dd");
	var dtitle = current_abbr.getAttribute("title");
	var dvalue = current_abbr.childNodes[0].nodeValue;
	// console.log(allAbbr[i].getAttribute("title"));
	// console.log(allAbbr[i].childNodes[0].nodeValue);
	dtElement.appendChild(document.createTextNode(dtitle));
	ddElement.appendChild(document.createTextNode(dvalue));
	dlElement.appendChild(dtElement);
	dlElement.appendChild(ddElement);
    }
    if (dlElement.childNodes.length < 1) return false;
    var display = document.getElementById("display-abbr");
    display.appendChild(dlElement);
    return true;
};

addLoadEvent(displayAbbreviations);
