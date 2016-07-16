function prepareSlideshow() {
    // 条件检测
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("linkList")) return false;

    // 创建元素节点
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id", "slideshow");

    // 创建图片节点
    var preview = document.createElement("img");
    preview.setAttribute("src", "images/longmao.jpg");
    preview.setAttribute("alt", "building blocks of web design");
    preview.setAttribute("id", "preview");


    slideshow.appendChild(preview);

    var list = document.getElementById("linkList");

    // 这里需要引用insertAfter.js
    insertAfter(slideshow, list);

    // 获取列表中的所有链接
    var links = list.getElementsByTagName("a");

    links[0].onmouseover = function() {
	// 这个需要引用moveElement.js
	moveElement("preview", -200, 0, 10);
    };
    links[1].onmouseover = function() {
	moveElement("preview", -400, 0, 10);
    };
    links[2].onmouseover = function() {
	moveElement("preview", -600, 0, 10);
    };
}

// 需要引用addLoadEvent
addLoadEvent(prepareSlideshow);
