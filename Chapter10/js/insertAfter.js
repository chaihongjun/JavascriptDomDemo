// 元素插入到某个元素后面
function insertAfter(newElement, targetElement) {
    // 获得父节点
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
	parent.appendChild(newElement);
    } else {
	parent.insertBefore(newElement, targetElement.nextSibling);
    }
}
