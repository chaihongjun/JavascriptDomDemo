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

function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
	parent.appendChild(newElement);
    } else {
	parent.insertBefore(newElement, targetElement.nextSibling);
    }
}


function addClass(element, value) {
    if (!element.className) {
	element.className = value;
    } else {
	var newClassName = element.className;
	newClassName += " ";
	newClassName += value;
	element.className = newClassName;
    }
}


function highlightPage() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var headers = document.getElementsByTagName('header');
    if (headers.length == 0) return false;
    var navs = headers[0].getElementsByTagName('nav');
    if (navs.length == 0) return false;
    var links = navs[0].getElementsByTagName('a');
    var linkurl;
    for (var i = 0; i < links.length; i++) {
	linkurl = links[i].getAttribute('href');
	if (window.location.href.indexOf(linkurl) != -1) {
	    links[i].className = "here";
	    var linktext = links[i].lastChild.nodeValue.toLowerCase();
	    document.body.setAttribute("id", linktext);
	}
    }
}

// 抽象后的函数
// 对elementID的元素进行位移，最后移动到final_x, final_y的绝对定位处。
// interval用来定义每次调用位移函数的时间间隔。
function moveElement(elementID, final_x, final_y, interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);
    // 这里采用属性的方式来操作movement。
    if (elem.movement) {
    	clearTimeout(elem.movement);
    }
    if (!elem.style.left) {
	elem.style.left = "0px";
    }
    if (!elem.style.top) {
	elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if (xpos == final_x && ypos == final_y) {
	return true;
    }

    var dist = 0;
    if (xpos < final_x) {
	dist = Math.ceil((final_x - xpos) / 10);
	xpos += dist;
    }
    if (xpos > final_x) {
	dist = Math.ceil((xpos - final_x) / 10);
	xpos -= dist;
    }
    if (ypos < final_y) {
	dist = Math.ceil((final_y - ypos) / 10);
	ypos += dist;
    }
    if (ypos > final_y) {
	dist = Math.ceil((ypos - final_y) / 10);
	ypos -= dist;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('" + elementID + "', "+ final_x + ", " + final_y + ", " + interval + ")";
    // 这里位移函数调用自身。众多位移值进行递增或者递减。直到最后到达目标的地方
    // 采用属性的方式来记录
    elem.movement = setTimeout(repeat, interval);
}


function prepareSlideshow() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("intro")) return false;
    var intro = document.getElementById("intro");
    var slideshow = document.createElement("div");
    var frame = document.createElement("img");
    frame.setAttribute("src", "images/frame.gif");
    frame.setAttribute("alt", "");
    frame.setAttribute("id", "frame");
    slideshow.appendChild(frame);
    slideshow.setAttribute("id", "slideshow");
    var preview = document.createElement("img");
    preview.setAttribute("src", "images/slideshow.gif");
    preview.setAttribute("alt", "a glimpse of what awaits you");
    preview.setAttribute("id", "preview");
    slideshow.appendChild(preview);
    insertAfter(slideshow, intro);

    var links = intro.getElementsByTagName("a");
    var destination;
    for (var i = 0; i < links.length; i++) {
	links[i].onmouseover = function() {
	    destination = this.getAttribute("href");
	    if (destination.indexOf("index.html") != -1) {
		moveElement("preview", 0, 0, 5);
	    }
	    if (destination.indexOf("about.html") != -1) {
		moveElement("preview", -150, 0, 5);
	    }
	    if (destination.indexOf("photos.html") != -1) {
		moveElement("preview", -300, 0, 5);
	    }
	    if (destination.indexOf("live.html") != -1) {
		moveElement("preview", -400, 0, 5);
	    }
	    if (destination.indexOf("contact.html") != -1) {
		moveElement("preview", -500, 0, 5);
	    }
	};
    }
}


function showSection(id) {
    var sections = document.getElementsByTagName("section");
    for (var i = 0; i < sections.length; i ++) {
	if (sections[i].getAttribute("id") != id) {
	    sections[i].style.display = "none";
	} else {
	    sections[i].style.display = "block";
	}
    }
}


function prepareInternalnav() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    var articles = document.getElementsByTagName("article");
    if (articles.length == 0) return false;
    var navs = articles[0].getElementsByTagName("nav");
    if (navs.length == 0) return false;
    var nav = navs[0];
    var links = nav.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
	var sectionId = links[i].getAttribute("href").split("#")[1];
	if (!document.getElementById(sectionId)) continue;
	document.getElementById(sectionId).style.display = "none";
	links[i].destination = sectionId;
	links[i].onclick = function() {
	    showSection(this.destination);
	    return false;
	};
    }
}


function showPic(whichpic) {
    if (!document.getElementById("placeholder")) return false;
    var source = whichpic.href;
    var placeholder = document.getElementById("placeholder");
    if (placeholder.nodeName != "IMG") return false;
    placeholder.src = source;
    if (!document.getElementById("description")) return false;
    if (document.getElementById("description")) {
	var title = whichpic.title ? whichpic.title : "";
	var description = document.getElementById("description");
	if (description.firstChild.nodeType == 3) {
	    description.firstChild.nodeValue = title;
	};
    };
    return false;
};

// 在js创建需要显示图片的节点, 以及对应描述的节点
function preparePlaceholder() {
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "images/placeholder.gif");
    placeholder.setAttribute("alt", "my image gallery");
    var description = document.createElement("p");
    description.setAttribute("id", "description");
    var text = document.createTextNode("Choose an images");
    description.appendChild(text);
    var pictureLib = document.getElementById("imagegallery");
    insertAfter(description, pictureLib);
    insertAfter(placeholder, description);
};

function prepareGallery() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    for (var i = 0; i < links.length; i ++) {
	links[i].onclick = function() {
	    return showPic(this);
	};
    }
}

// 为元素添加类
function addClass(element, value) {
    if (!element.className) {
	element.className = value;
    } else {
	var newClassName = element.className;
	newClassName += " ";
	newClassName += value;
	element.className = newClassName;
    }
}

function setTableRowColor() {
    if (!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i ++) {
	var odd = false;
	var allTrInTable = tables[0].getElementsByTagName("tr");
	for (var j = 0; j < allTrInTable.length; j ++) {
	    if(odd == true) {
		var current = allTrInTable[j];
		addClass(current, "odd");
		odd = false;
	    }else {
		odd = true;
	    }
	}
    }
}


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
    var header = document.createElement("h1");
    var display = document.createElement("div");
    var displayText = document.createTextNode("Abbrevations");
    header.appendChild(displayText);
    display.appendChild(dlElement);
    var body = document.getElementsByTagName("body")[0];
    body.appendChild(header);
    body.appendChild(display);
    return true;
};


function hightlightRows() {
    if(!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
	var current = rows[i];
	current.oldClassName = current.className;
	current.onmouseover = function() {
	    addClass(this, "heightlight");
	};
	current.onmouseout = function() {
	    this.className = this.oldClassName; 
	};
    }
}


function focusLabels() {
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    var labels = document.getElementsByTagName("label");
    for (var i = 0; i < labels.length; i++) {
	if (!labels[i].getAttribute("for")) continue;
	labels[i].onclick = function() {
	    var id = this.getAttribute("for");
	    var element = document.getElementById(id);
	    element.focus();
	};
    }
}

// 用来兼容一些不支持占位符的浏览器
function resetFields(whichform) {
    // 这里入口条件可以自己调整。
    if (Modernizr.input.placeholder) return;
    for (var i = 0; i < whichform.elements.length; i++) {
	var element = whichform.elements[i];
	if (element.type == "submit") continue;
	var check = element.placeholder || element.getAttribute('placeholder');
	if (!check) continue;
	element.onfocus = function() {
	    var text = this.placeholder || this.getAttribute('placeholder');
	    if (this.value == text) {
		this.className = '';
		this.value = '';
	    }
	};
	element.onblur = function() {
	    if (this.value == "") {
		this.className = 'placeholder';
		this.value = this.placeholder || this.getAttribute('placeholder');
	    }
	};
	element.onblur();
    }
}

// 遍历页面里所有的form对象
function prepareForms() {
    for (var i = 0; i < document.forms.length; i++) {
	var thisform = document.forms[i];
	resetFields(thisform);
	thisform.onsubmit = function() {
	    if (!validateForm(this)) return false;
	    var article = document.getElementsByTagName('article')[0];
	    if (submitFormWithAjax(this, article)) return false;
	    return true;
	};
    }
}


function isFilled(field) {
    if (field.value.replace(' ','').length == 0) return false;
    var placeholder = field.placeholder || field.getAttribute('placeholder');
    return (field.value != placeholder);
}

function isEmail(field) {
    return (field.value.indexOf("@") != -1 && field.value.indexOf(".") != -1);
}

function validateForm(whichforms) {
    for (var i = 0; i < whichforms.elements.length; i++) {
	var element = whichforms.elements[i];

	if (element.required == "required") {
	    if (!isFilled(element)) {
		alert("please fill in the " + element.name + " field");
		return false;
	    }
	}

	if (element.type == "email") {
	    if (!isEmail(element)) {
		alert("The " + element.name + " field must be a valid email address");
		return false;
	    }
	}
    }
    return true;
}

function getHTTPObject() {
    if (typeof XMLHttpRequest == "undefined") {
	try {
	    return new ActiveXobject("Msxml2.XMLHTTP.6.0");
	} catch (e){
	    
	}
	try {
	    return new ActiveXobject("Msxml2.XMLHTTP.3.0");
	} catch (e){
	    
	}
	try {
	    return new ActiveXobject("Msxml2.XMLHTTP");
	} catch (e){
	    
	}
	return false;
    }
    return new XMLHttpRequest();
}

function displayAjaxLoading(element) {
    while (element.hasChildNodes()) {
	element.removeChild(element.lastChild);
    }
    var content = document.createElement("img");
    content.setAttribute("src", "images/loading.gif");
    content.setAttribute("alt", "Loading...");
    element.appendChild(content);
}

function submitFormWithAjax(whichform, thetarget) {
    var request = getHTTPObject();
    if (!request) { return false;}
    displayAjaxLoading(thetarget);

    // 封装url
    var dataParts = [];
    var element;
    for (var i = 0; i < whichform.elements.length; i ++) {
	element = whichform.elements[i];
	dataParts[i] = element.name + '=' + encodeURIComponent(element.value);
    }
    var data = dataParts.join("&");
    request.open("POST", whichform.getAttribute("action"), true);
    request.setRequestHeader("Content-type", "application/x-wwww-form-urlencoded");
    request.onreadystatechange = function() {
	if (request.readyState == 4) {
	    if (request.status == 200 || request.status == 0) {
		console.log(request.responseText);
		var matchs = request.responseText.match(/<article>([\s\S]+)<\/article>/);
		if (matchs.length > 0) {
		    thetarget.innerHTML = matchs[1];
		} else {
		    thetarget.innerHTML = '<p>Oops, there was an error. Sorry</p>';
		}
	    } else {
		thetarget.innerHTML = '<p>' + request.statusText + '</p>';
	    }
	}
    };
    request.send(data);
    return true;
}


addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(setTableRowColor);
addLoadEvent(hightlightRows);
addLoadEvent(displayAbbreviations);
addLoadEvent(focusLabels);
addLoadEvent(prepareForms);
