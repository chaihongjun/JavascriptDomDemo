function positionMessage() {
    if (!document.getElementById) return false;
    if (!document.getElementById("message")) return false;
    var elem = document.getElementById("message");
    elem.style.position = "absolute";
    elem.style.left = "50px";
    elem.style.top = "100px";
    // 位移函数的入口，在此处调用。开始动画
    moveElement("message", 200, 200, 10);
    if (!document.getElementById("message2")) return false;
    var elem2 = document.getElementById("message2");
    elem2.style.position = "absolute";
    elem2.style.left = "50px";
    elem2.style.top = "50px";
    moveElement("message2", 0, 0, 100);
}



addLoadEvent(positionMessage);
