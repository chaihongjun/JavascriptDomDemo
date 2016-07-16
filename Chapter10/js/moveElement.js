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
